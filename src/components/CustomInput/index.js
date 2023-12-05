import React from "react";
import { Input } from "native-base"
import colors from "../../constants/colours";

const CustomInput = ({ handleChange, index }) => {
    const [code, setCode] = React.useState();
    return (
        <Input
            value={code}
            onChangeText={(t) => handleChange(t, index)}
            borderColor={colors.primary}
            color={colors.primary}
            borderWidth={2}
            bg={'transparent'}
            width={12} height={12}
            textAlign={'center'}
            borderRadius={50}
            fontSize={24}
            fontWeight={'bold'}
            mr={2}
        />
    )
}

export default CustomInput;