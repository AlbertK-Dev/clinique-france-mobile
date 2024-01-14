import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';


const PrimaryButton = ({
    title,
    textColor = "white",
    onPress,
    isLoading = false,
    isLoadingText = 'Submitting',
    style,
    color,
    fill = true,
    disabled = false,
    minWidth = '1/3',
    ...rest
}) => {
    const handleOnPress = () => {
        Alert.alert('Button Clicked...');
    };

    return (
        <Button
            loading={isLoading}
            onPress={onPress ?? handleOnPress}
            backgroundColor={color}
            minWidth={minWidth}
            style={[style ? style : {}]}
            disabled={disabled}
            textColor={textColor}
            {...rest}>
            {title}
        </Button>

    );
};

export default PrimaryButton;

PrimaryButton.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func,
    isLoading: PropTypes.bool,
    isLoadingText: PropTypes.string,
    style: PropTypes.object,
    fill: PropTypes.bool,
};
