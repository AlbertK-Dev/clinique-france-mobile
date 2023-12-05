import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HStack, Icon, IconButton, Text, VStack } from "native-base"
import { ArrowLeft, Hospital } from 'iconsax-react-native'
import styles from "./style";
import { getMapDirections } from "../../redux/User/action";
import { connect, useDispatch } from 'react-redux'

const RoadMap = ({ route, navigation, mapDirections }) => {
    const [origin, setOrigin] = useState(null);
    const dispatch = useDispatch()
    const clinic = { latitude: parseFloat(route?.params?.localisation?.latitude), longitude: parseFloat(route?.params?.localisation?.longitude) }

    useEffect(() => {
        const getLocation = async () => {
            let coords = await AsyncStorage.getItem("coords")
            if (coords) {
                const { latitude, longitude } = JSON.parse(coords)
                setOrigin({ latitude, longitude });
                return;
            }
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            const { latitude, longitude } = await Location.getCurrentPositionAsync({});
            setOrigin({ latitude, longitude });
        };
        getLocation();
    }, []);

    useEffect(() => {
        if (!origin) return
        dispatch(getMapDirections({
            start: [origin.latitude, origin.longitude],
            end: [clinic.latitude, clinic.longitude]
        }))
    }, [origin])

    if (!origin) {
        return (
            <View></View>
        )
    }

    return (
        <View flex={1}>
            <MapView
                style={styles.mapView}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                
                minZoomLevel={10}
            >
                <Marker
                    coordinate={{ latitude: origin.latitude, longitude: origin.longitude }}
                    title={"Votre position"}
                />
                <Marker
                    coordinate={{ latitude: clinic.latitude, longitude: clinic.longitude }}
                    title={"Clinique"}
                    icon={<Icon as={<Hospital />} color="primary.500" />}
                />
            </MapView>
            <View bg="red.100" style={styles.mapHeader}>
                <IconButton
                    style={styles.back}
                    onPress={() => { navigation.goBack() }}
                    icon={<Icon as={<ArrowLeft color={"#000"} size="32" />} />}
                />
            </View>
        </View>
    );
};

const mapStateToProps = ({ UserReducer }) => ({
    mapDirections: UserReducer.mapDirections
})

export default connect(mapStateToProps)(RoadMap);