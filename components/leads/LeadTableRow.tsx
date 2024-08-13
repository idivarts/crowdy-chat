import Colors from "@/constants/Colors";
import { Text, View } from "../Themed";
import PressableButton from "../ui/pressable-button";
import styles from "@/styles/leads/LeadsTable.styles";
import { Checkbox } from "react-native-paper";

interface LeadTableRowProps {
  isSelected: boolean;
  item: any;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({
  isSelected,
  item,
  onDelete,
  onSelect,
}) => (
  <View
    style={[
      styles.rowContainer,
      {
        backgroundColor: Colors.regular.white,
      },
    ]}
  >
    <View style={styles.checkbox}>
      <Checkbox
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => {
          onSelect(item.id);
        }}
      />
    </View>
    <Text style={styles.rowText}>{item.name}</Text>
    <Text style={styles.rowText}>{item.source}</Text>
    <Text style={styles.rowText}>{item.campaigns.join(', ')}</Text>
    <PressableButton title="Delete" onPress={() => onDelete(item.id)} />
  </View>
);

export default LeadTableRow;
