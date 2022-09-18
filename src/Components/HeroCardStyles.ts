import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerButton: { padding: 5, paddingBottom: 15},
    cardContainer: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "black",
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
    },
    textContainer: { flex: 1, paddingVertical: 15, justifyContent: "space-between" },
    text: { color: "white", textAlign: "center" }
})