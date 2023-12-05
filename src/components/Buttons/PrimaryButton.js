import { Button } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-native';


const PrimaryButton = ({
    title,
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
            _text={{
                fontSize: 16
            }}
            isLoading={isLoading}
            isLoadingText={isLoadingText}
            onPress={onPress ?? handleOnPress}
            backgroundColor={color}
            minWidth={minWidth}
            style={[style ? style : {}]}
            disabled={disabled}
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
