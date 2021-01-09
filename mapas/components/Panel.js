import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

export default ({onPressLeft, textLeft, TogglePointsFilter}) => {
    return (
        <View style={styles.panel}>
            <Button onPress={onPressLeft} title={textLeft} />
            <Button onPress={TogglePointsFilter} title="Mostrar/Ocultar" />
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
