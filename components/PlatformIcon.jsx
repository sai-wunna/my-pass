import React from "react";
import { View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeBrandIcon from "react-native-vector-icons/FontAwesome6";
import FoundationIcon from "react-native-vector-icons/Foundation";
import EntypoIcon from "react-native-vector-icons/Entypo";

const platformIcons = {
	Facebook: <IonIcon name="logo-facebook" size={24} color="#4267B2" />,
	YouTube: <IonIcon name="logo-youtube" size={24} color="#FF0000" />,
	WhatsApp: <IonIcon name="logo-whatsapp" size={24} color="#25D366" />,
	Instagram: <IonIcon name="logo-instagram" size={24} color="#E4405F" />,
	TikTok: <IonIcon name="logo-tiktok" size={24} color="#010101" />,
	WeChat: <IonIcon name="logo-wechat" size={24} color="#7BB32E" />,
	Messenger: (
		<FontAwesomeBrandIcon
			name="facebook-messenger"
			size={24}
			color="#0084FF"
		/>
	),
	Gmail: <IonIcon name="mail" size={24} color="black" />,
	Telegram: <FontAwesomeIcon name="telegram" size={24} color="#0088cc" />,
	Snapchat: <FontAwesomeIcon name="snapchat" size={24} color="#FDDC00" />,
	Douyin: <FontAwesomeIcon name="music" size={24} color="#010101" />, // Placeholder, replace with actual Douyin icon
	Github: <IonIcon name="logo-github" size={24} color="#000000" />,
	Reddit: <IonIcon name="logo-reddit" size={24} color="#FF4500" />,
	Pinterest: <IonIcon name="logo-pinterest" size={24} color="#E60023" />,
	LinkedIn: <IonIcon name="logo-linkedin" size={24} color="#0A66C2" />,
	Discord: <IonIcon name="logo-discord" size={24} color="#5865F2" />,
	Twitch: <IonIcon name="logo-twitch" size={24} color="#9146FF" />,
	Viber: <FontAwesomeIcon name="viber" size={24} color="#665CAC" />, // Placeholder
	Medium: <IonIcon name="logo-medium" size={24} color="#000000" />,
	Quora: <FontAwesomeIcon name="quora" size={24} color="#B92B27" />,
	"X (formerly Twitter)": (
		<FontAwesomeBrandIcon name="x-twitter" size={24} color="black" />
	),
	"Baidu Tieba": <FontAwesomeIcon name="circle" size={24} color="#0033CC" />, // Placeholder
	Kuaishou: <FontAwesomeIcon name="video" size={24} color="#FF6633" />, // Placeholder
	"Sina Weibo": <FontAwesomeIcon name="weibo" size={24} color="#E6162D" />,
	Vimeo: <IonIcon name="logo-vimeo" size={24} color="#1AB7EA" />,
	Line: <FontAwesomeBrandIcon name="line" size={24} color="#00B900" />,
	Tumblr: <IonIcon name="logo-tumblr" size={24} color="#35465C" />,
	Flickr: <IonIcon name="logo-flickr" size={24} color="#FF0084" />,
	MySpace: <FoundationIcon name="social-myspace" size={24} color="#003366" />, // Placeholder
	Mixi: <EntypoIcon name="mixi" size={24} color="#FF6600" />, // Placeholder
	"Xiaohongshu (Little Red Book)": (
		<FontAwesomeIcon name="book" size={24} color="#FF4C4C" />
	), // Placeholder
	Clubhouse: <EntypoIcon name="hand" size={24} color="#F5DF4D" />, // Placeholder
	Microsoft: <IonIcon name="logo-microsoft" size={24} color="#F65314" />,
	Figma: <IonIcon name="logo-figma" size={24} color="#F24E1E" />,
	Yahoo: <FontAwesomeBrandIcon name="yahoo" size={24} color="#410093" />,
};

export default function PlatformIcon({ platform }) {
	return (
		<View>
			{platformIcons[platform] || (
				<IonIcon name="link" size={24} color="#a43829" />
			)}
		</View>
	);
}
