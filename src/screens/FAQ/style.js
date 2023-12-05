import colors from '../../constants/colours';

const styles = {
    container: {
        backgroundColor: colors.bg_grey,
    },

    headerItemGroup: {
        backgroundColor: colors.white,
        padding: 15,
        gap:15
    },

    headerText: {
        color: colors.text_grey_hint
    },

    headerItem: {
        alignItems: 'center',
        marginBottom: '5%',
        display:'flex',
        flexDirection:"row",
        gap:5
    },

    iconBox: {
        height: 40,
        width: 40,
        backgroundColor: 'rgba(4, 183, 201, 0.15)',
        marginRight: 4,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default styles;