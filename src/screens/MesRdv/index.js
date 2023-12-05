import React, { useState, useCallback, useRef } from "react";
import Rdv from "../../components/Rdv";
import { Skelette } from "./squelette";
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getMyRDV } from "../../redux/RDV/actions";
import { FolderOpen, Sort } from "iconsax-react-native";
import styles from "./style";
import colors from "../../constants/colours";
import { Pressable, TouchableOpacity, View } from "react-native";
import BottomSheet from "./bottomSheet";
import { FlashList } from "@shopify/flash-list";
import { Text } from "native-base";

const MesRdv = ({ navigation }) => {
  const listRef = useRef()
  const rdvs = useSelector(state => state.RdvForm.myRdv)
  const [filterBy, setFilterBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [appointments, setAppointments] = useState(rdvs)
  const [globalState, setGlobalState] = useState({
    actualState: 1,
    loading: false,
    status: 'Planifié',
    showSkeleton: false,
  })

  const dispatch = useDispatch()
  const loadingRDV = useSelector(state => state.RdvForm.rdvLoading)
  const user = useSelector(state => state.UserReducer.userInfos)
  const [isOpen, setIsOpen] = useState(false);

  const filterChange = useCallback((value) => {
    setFilterBy(value)
  }, [])

  const orderChange = useCallback((value) => {
    setOrder(value)
  }, [])

  const compare = (a, b, filter, order) => {
    const aValue = filterBy === "created_at" ? a.created_at : a.date;
    const bValue = filterBy === "created_at" ? b.created_at : b.date;

    if (order === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    };
  }

  const getRdvs = () => {
    dispatch(clearCache())
    if (rdvs.length <= 0) {
      dispatch(getMyRDV(user?.user?._id))
      setGlobalState({ ...globalState, showSkeleton: true })
    }
  }

  const refreshRdv = () => {
    dispatch(getMyRDV(user?.user?._id))
    setGlobalState({ ...globalState, showSkeleton: true })
  }

  React.useEffect(() => {
    getRdvs()
  }, []);

  const handleChange = useCallback((value) => {
    setIsOpen(value)
  }, [isOpen])

  React.useEffect(() => {
    const filteredRdvs = rdvs.filter((rdv) => rdv.status == globalState.status).sort((a, b) => compare(a, b, filterBy, order))
    setGlobalState({ ...globalState, showSkeleton: false, loading: false })
    setAppointments(filteredRdvs)
  }, [globalState.actualState, rdvs])

  // Ordonner les rdvs selon le choix de l'utilisateur
  const memoizedSorted = useCallback((filterBy, order) => {
    const copy = [...appointments]
    copy.sort((a, b) => compare(a, b, filterBy, order))
    setAppointments(copy)
  }, [appointments]);

  const handleStateChange = (newState) => {
    if (globalState.actualState === newState) return

    const val = newState === 1 ? "Planifié" : "Terminé";
    setGlobalState({
      ...globalState,
      actualState: newState,
      loading: true,
      status: newState !== 3 ? val : "Annulé",
      showSkeleton: true,
    });
  };

  return (
    <View flex={1} paddingTop={2}>
      <View style={styles.display}>
        <Text style={styles.sectionTitle} fontSize={18}>
          Rendez-vous
          <Text style={{ fontSize: 14 }}> ({appointments.length})</Text>
        </Text>
        <TouchableOpacity onPress={() => handleChange(true)}>
          <View style={styles.filter}>
            <Sort color={colors.black} />
            <Text>Trier</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabView}>
        <View style={styles.tab}>
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            borderRightWidth={1}
            borderRightColor={"#DADADA"}
            height={"90%"}
            width={"33%"}
          >
            <Pressable
              onPress={() => { handleStateChange(1) }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={globalState.actualState === 1 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: globalState.actualState === 1 ? "white" : "#909090",
                }}
              >
                A venir
              </Text>
            </Pressable>
          </View>
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            borderRightWidth={1}
            borderRightColor={"#DADADA"}
            height={"90%"}
            width={"34%"}
          >
            <Pressable
              onPress={() => { handleStateChange(2) }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={globalState.actualState === 2 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: globalState.actualState === 2 ? "white" : "#909090",
                }}
              >
                Terminé
              </Text>
            </Pressable>
          </View>
          <View
            height={"90%"}
            width={"33%"}
            display={"flex"}
            flexDirection={"row"}
            borderRightColor={"#DADADA"}
            justifyContent={"center"}
          >
            <Pressable
              onPress={() => { handleStateChange(3) }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={globalState.actualState === 3 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: globalState.actualState === 3 ? "white" : "#909090",
                }}
              >
                Annulé
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {appointments.length !== 0 && !loadingRDV && !globalState.loading && !globalState.showSkeleton && (
        <View style={styles.flatList}>
          <FlashList
            ref={listRef}
            estimatedItemSize={200}
            onRefresh={refreshRdv}
            refreshing={globalState.showSkeleton || loadingRDV}
            data={appointments}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={({ item }) => {
              return (<View key={item._id} backgroundColor={"white"} style={[styles.card]}>
                <Rdv
                  _id={item._id}
                  localisation={item?.lieu?.location}
                  navigation={navigation}
                  praticien={item?.name + " " + item.surname}
                  date={item?.date}
                  status={item?.status}
                  startTime={item?.displayedDate}
                  motif={item?.motif}
                />
              </View>)
            }}
          />
        </View>
      )}

      {loadingRDV || globalState.showSkeleton &&
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 5 }}>
            <Skelette />
          </View>
          <View style={{ marginBottom: 5 }}>
            <Skelette />
          </View>
          <View>
            <Skelette last={true} />
          </View>
        </View>
      }

      {(appointments.length === 0 && !globalState.showSkeleton) &&
        <View style={styles.center} flex={1}>
          <FolderOpen variant="Outline" size={80} color="#a7a7a7" />
          <Text style={styles.empty}>Vous n'avez aucun rendez-vous {globalState.status.toLowerCase()}</Text>
        </View>
      }

      <BottomSheet
        memoizedSorted={memoizedSorted}
        isOpen={isOpen}
        close={handleChange}
        filterBy={filterBy}
        order={order}
        setFilterBy={filterChange}
        setOrder={orderChange}
      />
    </View>
  );
}

export default MesRdv
