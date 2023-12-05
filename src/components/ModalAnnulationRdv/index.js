import { Button, FormControl, Input, Modal, Text, VStack } from "native-base";
import React from "react";
import colors from "../../constants/colours";

export const ModalAnnulationRdv = ({ open, onClose, loading, onsubmit }) => {

    const [modalVisible, setModalVisible] = React.useState(true);

    return <>
        <Modal isOpen={open} onClose={() => onClose()} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
            <Modal.Content style={{ width: "95%" }}>
                <Modal.CloseButton />
                <Modal.Header>Annulation du rendez-vous</Modal.Header>
                <Modal.Body>
                    <Text textAlign={"center"}>
                        Etes-vous sûr de vouloir annuler ce rendez-vous ?
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        isLoading={loading}
                        onPress={() => onsubmit()}
                        style={{
                            backgroundColor: colors.transp_danger
                        }}
                        flex="1">
                        <Text style={{ color: colors.danger }}>Oui, annuler</Text>
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
        <VStack space={8} alignItems="center">
        </VStack>
    </>;

}