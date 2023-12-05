import { Dimensions } from 'react-native';
import colors from './colours';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
export const style = {
    input: {
        backgroundColor: colors.whiteColor,
        borderRadius: 6,
        shadowColor: colors.blackColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        borderColor: colors.whiteColor,
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: colors.whiteColor,
    },
    hauteur:'100%'
}
