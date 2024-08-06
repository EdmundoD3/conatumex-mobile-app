import SettingsScreen from "../screen/Setting/settingScreen";

const SettingsNav = () => {

  return (
    <SettingsScreen/>
  );
};



export default SettingsNav;
// import { Text, TouchableOpacity, View } from "react-native";
// import { useAuthContext } from "../context/AuthContext";
// import { AdminUserStorage } from "../database/AdminUserStorage";

// export default function SettingsScreen() {
//   const {logout, userData} = useAuthContext()
//   const {user} = userData
//   console.log(userData);
//   const logut =async ()=>{
//     try {
//       await AdminUserStorage.out()
//       logout()
//     } catch (error) {
//       console.log(error);
//     }
    
//   }
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//       <TouchableOpacity onPress={logut}><Text>log out</Text></TouchableOpacity>
//     </View>
//   );
// }