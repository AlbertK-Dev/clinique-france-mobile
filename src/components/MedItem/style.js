import colors from "../../constants/colours";

const styles = {
    medBox: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 0.5,
    },

    medName: {
        fontWeight: '500'
    },

    hStack:{
        display:"flex",
        flexDirection: "row",
        gap:5,
        alignItems: "center"
    },

    medCenter: {
        color: colors.text_grey_hint,
        fontSize: 12
    },

    medTax: {
        fontSize: 12,
        color: colors.secondary
    },
}

export default styles;