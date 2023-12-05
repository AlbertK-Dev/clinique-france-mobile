import { Actionsheet, Text } from "native-base";
import { TouchableOpacity, View } from "react-native";
import colors from "../../constants/colours";
import styles from "./style";
import { memo } from "react";

const BottomSheet = (props) => {
  const {
    isOpen,
    close,
    memoizedSorted,
    setOrder,
    setFilterBy,
    filterBy,
    order,
  } = props;
  const _rdv_date = "rdv_date";
  const _created_at = "created_at";
  const _sort_asc = "asc";
  const _sort_desc = "desc";

  const getValue = (value, expected, incorrect, correct = colors.primary) => {
    return value === expected ? correct : incorrect;
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={() => close(false)}>
      <Actionsheet.Content>
        <Actionsheet.Item backgroundColor={'transparent'}>
          <Text style={styles.title} fontWeight='600'>Options de tri</Text>
          <View style={styles.btnItem}>
            <TouchableOpacity
              style={[
                styles.filterBtn,
                styles.btnLeftItem,
                {
                  backgroundColor: getValue(
                    filterBy,
                    _created_at,
                    "transparent",
                    colors.trans_primary
                  ),
                  borderColor: getValue(filterBy, _created_at, "#c2c2c2"),
                  borderRightWidth: getValue(filterBy, _created_at, 0, 1),
                },
              ]}
              onPress={() => {
                setFilterBy(_created_at);
                setTimeout(() => {
                  memoizedSorted(_created_at, order);
                }, 1);
              }}
            >
              <Text
                flex={1}
                style={{
                  ...styles.label,
                  color: getValue(filterBy, _created_at, colors.text_grey_hint),
                }}
                textAlign={"center"}
              >
                Date de création
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterBtn,
                styles.btnRightItem,
                {
                  backgroundColor: getValue(
                    filterBy,
                    _rdv_date,
                    "transparent",
                    colors.trans_primary
                  ),
                  borderColor: getValue(filterBy, _rdv_date, "#c2c2c2"),
                  borderLeftWidth: getValue(filterBy, _rdv_date, 0, 1),
                },
              ]}
              onPress={() => {
                setFilterBy(_rdv_date);
                setTimeout(() => {
                  memoizedSorted(_rdv_date, order);
                }, 1);
              }}
            >
              <Text
                style={[
                  styles.label,
                  {
                    color: getValue(filterBy, _rdv_date, colors.text_grey_hint),
                  },
                ]}
                textAlign={"center"}
              >
                Date du rendez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </Actionsheet.Item>
        <Actionsheet.Item backgroundColor='transparent'>
          <Text style={styles.title} fontWeight='600'>Ordre</Text>
          <View style={styles.btnItem}>
            <TouchableOpacity
              style={[
                styles.sortBtn,
                styles.btnLeftItem,
                {
                  backgroundColor: getValue(
                    order,
                    _sort_asc,
                    "transparent",
                    colors.trans_primary
                  ),
                  borderColor: getValue(order, _sort_asc, "#c2c2c2"),
                  borderRightWidth: getValue(order, _sort_asc, 0, 1),
                },
              ]}
              onPress={() => {
                setOrder(_sort_asc);
                setTimeout(() => {
                  memoizedSorted(filterBy, _sort_asc);
                }, 1);
              }}
            >
              <Text
                style={[
                  styles.label,
                  { color: getValue(order, _sort_asc, colors.text_grey_hint) },
                ]}
                textAlign={"center"}
              >
                Ascendant
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortBtn,
                styles.btnRightItem,
                {
                  backgroundColor: getValue(
                    order,
                    _sort_desc,
                    "transparent",
                    colors.trans_primary
                  ),
                  borderColor: getValue(order, _sort_desc, "#c2c2c2"),
                  borderLeftWidth: getValue(order, _sort_desc, 0, 1),
                },
              ]}
              onPress={() => {
                setOrder(_sort_desc);
                setTimeout(() => {
                  memoizedSorted(filterBy, _sort_desc);
                }, 1);
              }}
            >
              <Text
                textAlign={"center"}
                style={[
                  styles.label,
                  { color: getValue(order, _sort_desc, colors.text_grey_hint) },
                ]}
              >
                Descendant
              </Text>
            </TouchableOpacity>
          </View>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(BottomSheet);
