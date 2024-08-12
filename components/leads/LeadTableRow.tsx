import { Text, View } from "../Themed";
import PressableButton from "../ui/pressable-button";
import styles from "@/styles/leads/LeadsTable.styles";

interface LeadTableRowProps {
  backgroundColor: string;
  item: any;
  onDelete: (id: string) => void;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({
  backgroundColor,
  item,
  onDelete,
}) => (
  <View
    style={[
      styles.rowContainer,
      {
        backgroundColor,
      },
    ]}
  >
    <Text style={styles.rowText}>{item.name}</Text>
    <Text style={styles.rowText}>{item.source}</Text>
    <Text style={styles.rowText}>{item.campaigns.join(', ')}</Text>
    <PressableButton title="Delete" onPress={() => onDelete(item.id)} />
  </View>
);

export default LeadTableRow;
