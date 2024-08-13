import styles from "@/styles/leads/LeadsTable.styles";
import { Text, View } from "../Themed";
import { Checkbox } from "react-native-paper";

interface LeadTableHeaderProps {
  isSelected: boolean;
  onSelect: () => void;
}

const LeadTableHeader: React.FC<LeadTableHeaderProps> = ({
  isSelected,
  onSelect,
}) => (
  <View
    style={styles.headerContainer}
  >
    <View
      style={styles.checkbox}
      lightColor="transparent"
    >
      <Checkbox
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => {
          onSelect();
        }}
      />
    </View>
    <Text style={styles.headerText}>Name</Text>
    <Text style={styles.headerText}>Source</Text>
    <Text style={styles.headerText}>Campaigns</Text>
    <Text style={styles.headerAction}>Action</Text>
  </View>
);

export default LeadTableHeader;
