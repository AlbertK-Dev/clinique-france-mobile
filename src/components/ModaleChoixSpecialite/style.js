import colors from "../../constants/colours"

const styles = {
    container: {
        padding: 20,
    },

    header: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    closeBtn: {
        borderColor: colors.text_grey_hint,
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 10,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleBox: {
        alignItems: 'center',
    },

    number: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    numberLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.white
    },

    title: {
        fontWeight: '500',
        fontSize: 16
    },

    hintText: {
        color: colors.text_grey_hint
    },

    period: {
        padding: 10,
        borderRadius: 10,
        borderColor: colors.text_grey_hint,
        borderWidth: 0.5
    },

    prev: {
        height: 25,
        width: 25,
        backgroundColor: colors.trans_primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },

    btnBox: {
        position: 'absolute',
        bottom: 0,
        width: '112%',
        padding: 20,
    },

    btn: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        borderColor: colors.primary,
    },

    btnLabel: {
        fontSize: 18
    },
    boxCloseIconDialogContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    boxCloseIconDialog: {},
    radioContainer: {
        height: 70,
        marginTop: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    radio: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        width: "100%",
        height: 45,
        padding: 5,
        borderRadius: 10,
        borderColor: colors.white
    },
    dialogContent: {
        backdropFilter: 'blur(50px)'
    },
    dialog: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }
}

styles.boxCloseIconDialog = {
    ...styles.closeBtn, height: 25,
    width: 25,
    right: -10,
    top: -10
}

export default styles;
