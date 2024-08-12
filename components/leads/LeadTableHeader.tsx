import styles from "@/styles/leads/LeadsTable.styles";
import { Text, View } from "../Themed";

const LeadTableHeader: React.FC = () => (
  <View
    style={styles.headerContainer}
  >
    <Text style={styles.headerText}>Name</Text>
    <Text style={styles.headerText}>Source</Text>
    <Text style={styles.headerText}>Campaigns</Text>
    <Text style={styles.headerAction}>Action</Text>
  </View>
);

export default LeadTableHeader;
