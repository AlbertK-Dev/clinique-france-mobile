import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colours';


const Refresh = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress} style={{ flexDirection: "row", paddingRight: 10 }}>
            <IconMatCom
                name="refresh"
                color={colors.whiteColor}
                size={25}
            />
        </TouchableOpacity>
    );
};

export default Refresh;
