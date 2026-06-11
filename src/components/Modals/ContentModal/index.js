import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal'

import themeStyle from '../../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/utils/constants';


const UploadingModal = (props) => {

    const renderView = (module) => {
        let social = <Text style={styles.headingText}>Are you sure you want to signout?</Text>
        switch (module) {
            case 'Social':
                return <View style={{ marginBottom: "5%" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.headingText}>Is my account public or private?</Text>
                        <Text style={styles.headingText2}>User can opt to either make their account public or private depending upon their comfort.</Text>
                        <Text style={styles.headingText}>Is there a time limit on length of video for posting on social?</Text>
                        <Text style={styles.headingText2}>Yes, for the time being maximum 10 second videos can be uploaded.</Text>
                        <Text style={styles.headingText}>For how long will a story appear on the feed?</Text>
                        <Text style={styles.headingText2}>Story will be visible to other users for 24 hours.</Text>
                        <Text style={styles.headingText}>Can a user post multiple pics at 1 time?</Text>
                        <Text style={styles.headingText2}>Yes, a user can post maximum of 5 pictures at 1 time.</Text>
                    </ScrollView>

                </View>

            case 'General':
                return (
                    <View style={{ height: SCREEN_HEIGHT * 0.6, marginBottom: "5%" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.headingText}>Why are there so many identity checks?</Text>
                            <Text style={styles.headingText2}>Medicos connect uses multiple identity checks to make sure:
                                {`\n`} 1.	true identity of the user
                                {`\n`} 2.	avoid duplicate accounts
                                {`\n`} 3.	avoid cat fishing
                                {`\n`} 4.	avoid scams
                                {`\n`} 5.	no one can harass anyone on theplatform
                                {`\n`} 6.	avoid unsolicited explicit pics on platform
                                {`\n`} 7.	avoid cyber bullying
                            </Text>
                            <Text style={styles.headingText}>How will the multiple identification method stated would help us?</Text>
                            <Text style={styles.headingText2}>Firstly, no one will be able to hide behind the keyboard to launch personal attacks because of their real identities and the fear of being named and shamed in community. Secondly, it will help in tackling the social media toxicity by eliminating trolls which will encourage people to share more.</Text>
                            <Text style={styles.headingText}>What if I am hesitant in sharing my personal info?</Text>
                            <Text style={styles.headingText2}>Your personal data once verified, will be encrypted immediately and will not be accessible to anyone including the developers.</Text>
                            {/* <Text style={styles.headingText}>Is my data safe?</Text>
                            <Text style={styles.headingText2}>Yes, your data is completely safe. We have introduced industry standard security measures in the system. </Text> */}
                            <Text style={styles.headingText}>Can I report someone? </Text>
                            <Text style={styles.headingText2}>Anyone with malicious intent should be reported immediately by the community members to keep the platform safe.</Text>
                            <Text style={styles.headingText}>What steps will be taken to resolve my issue after I report a user?</Text>
                            <Text style={styles.headingText2}>If it’s a minor issue, then we will warn the user after the review process but if its something severe we will block the user and help you in pursuing legal action</Text>
                            {/* <Text style={styles.headingText}>Can’t people misuse this to malign someone or attack someone’s character?</Text>
                            <Text style={styles.headingText2}>Yes, they can but without proper investigation no steps will be taken against anyone and incase of false accusations the one with false intent will be blocked instead.</Text> */}
                            <Text style={styles.headingText}>Is this the whole ecosystem or will there be other modules as well?</Text>
                            <Text style={styles.headingText2}>There are few other modules in process. This is just the beginning; the whole ecosystem will be launched in phases in order to not over complicate it for the users.</Text>
                            <Text style={styles.headingText}>What is medicos connect?</Text>
                            <Text style={styles.headingText2}>The main idea behind medicos connect is to create an ecosystem for all the medical professionals around the world where different aspects of their lives i.e. personal, professional, financial and mental health can be improved. For more details on this, click below on Mission statement.</Text>
                            <Text style={styles.headingText}>Who is it for?</Text>
                            <Text style={styles.headingText2}>Anyone who has a degree or diploma in any field of medicine and healthcare is more than welcome to join in. </Text>
                            <Text style={styles.headingText}>Why is there a different profile for every module?</Text>
                            <Text style={styles.headingText2}>What you may want to share with your friends is different from what you present to a prospective employer. Different profiles for each module were designed to customize the information available for personal and professional interactions.</Text>
                            <Text style={styles.headingText}>Is Medicos only for a specific region?</Text>
                            <Text style={styles.headingText2}>It’s for our whole community worldwide.</Text>
                            <Text style={styles.headingText}>Will application be available in other languages?</Text>
                            <Text style={styles.headingText2}>Yes, with time other languages will be integrated into the system.</Text>
                            {/* <Text style={styles.headingText}>I cannot access some functions in the app, why?</Text>
                            <Text style={styles.headingText2}>That’s because of regional restrictions imposed by certain countries and we will try to resolve them as we go, until then there’s no way around it and we apologies for that </Text> */}
                            <Text style={styles.headingText}>Is Medicos Connect free?</Text>
                            <Text style={styles.headingText2}>Yes, it’s completely free for individuals and colleges and but some advanced features will require you to spend ampules to unlock them.</Text>
                            <Text style={styles.headingText}>What are ampules?</Text>
                            <Text style={styles.headingText2}>Ampules are basically virtual tokens that you buy and spend in the system instead of using your credit/debit card all the time.</Text>
                            <Text style={styles.headingText}>Are ampules and wallet just like bitcoin and crypto wallet?</Text>
                            <Text style={styles.headingText2}>Ampules are not cryptocurrency. </Text>
                            <Text style={styles.headingText}>Can I update my information in the system?</Text>
                            <Text style={styles.headingText2}>Profile information can be updated anytime, except for age, gender and name. Name can only be updated before the identification process, and cannot be changed afterwards. In case of legal name change, you will have to provide new Government identity.</Text>
                            <Text style={styles.headingText}>Why are there ads on the app?</Text>
                            <Text style={styles.headingText2}>Ads are to generate revenue for the system.</Text>
                            <Text style={styles.headingText}>Why should we enable geolocation?</Text>
                            <Text style={styles.headingText2}>Apps alogorithm uses geolocation to suggest best matches for different modules.</Text>
                            <Text style={styles.headingText}>Can I delete my medicos connect account?</Text>
                            <Text style={styles.headingText2}>Yes, whenever you feel like it serves you no purpose just go to settings and delete your account permanently. System will delete all your data permanently as well. Moreover, if you want to reinstall the application then you will have to go through all of the identification process again.</Text>
                            <Text style={styles.headingText}>Can I give feedback?</Text>
                            <Text style={styles.headingText2}>Yes, off course we welcome feedback and would love to hear your suggestion to improve. We will strive to learn and grow with feedback from our community. </Text>
                            <Text style={styles.headingText}>How will the app improve mental health of medicos?</Text>
                            <Text style={styles.headingText2}>The aim is to help resolve the general underlying issues of the medical community which acts as major stressors. The ecosystem will help deal with burnout and to help formulate better stress coping mechanisms. Every solution, hopefully, will impact the mental health of medicos positively and improve their quality of life. </Text>
                            {/* <Text style={styles.headingText}>Why does verification process takes so much time?</Text>
                            <Text style={styles.headingText2}>The process is done manually in order to avoid unnecessary errors and ensure the accuracy of information so takes more time than usual.</Text> */}
                            {/* <Text style={styles.headingText}>Is medicos connect a corporation?</Text>
                            <Text style={styles.headingText2}>No, it’s not a corporation.</Text> */}
                            <Text style={styles.headingText}>Are medical students welcome on the app?</Text>
                            <Text style={styles.headingText2}>Yes absolutely, but if you are under 18, then you won’t be allowed to use the dating module due to underage dating laws in different countries.</Text>
                        </ScrollView>
                    </View>
                )
            case 'MC Games':
                return (
                    <View style={{ height: SCREEN_HEIGHT * 0.6, marginBottom: "5%" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.headingText}>Are all the games included in 1 app or do they have to be downloaded separately?</Text>
                            <Text style={styles.headingText2}>There is only one app for all the games. Inside the app, users can download whichever game they want to play.</Text>
                            <Text style={styles.headingText}>Why is there a separate game app and why are they not integrated in games module?</Text>
                            <Text style={styles.headingText2}>To keep the app size small, games consume a lot of storage space on the phone and everyone may not be into games.</Text>
                            <Text style={styles.headingText}>Do we need a new login for the games app?</Text>
                            <Text style={styles.headingText2}>No, user can login with the same account.</Text>
                            <Text style={styles.headingText}>Will non-medicos be allowed to use the gaming app?</Text>
                            <Text style={styles.headingText2}>Yes, gaming app is for everyone and reason for it is to allow friends and families of medicos to play together.</Text>
                            <Text style={styles.headingText}>Can we create private rooms in the game?</Text>
                            <Text style={styles.headingText2}>Yes, any user can create a private room to play with specific users.</Text>
                            <Text style={styles.headingText}>Is gambling allowed in the application?</Text>
                            <Text style={styles.headingText2}>No strictly not, all games are just for fun and any sort of gambling will not be tolerated in the application.</Text>
                            <Text style={styles.headingText}>Whats the purpose of wallet in the application?</Text>
                            <Text style={styles.headingText2}>Wallet allow users to buy ampules and spend them in the shop to buy various stuff available to enhance gaming experience</Text>
                            <Text style={styles.headingText}>Will ampules from main application work in the gaming app?</Text>
                            <Text style={styles.headingText2}>Yes, all medico user will have the same wallet across both apps so if there are ampules already in the wallet then they won’t have to buy more.</Text>
                            <Text style={styles.headingText}>What is the server mode?</Text>
                            <Text style={styles.headingText2}>Our community plays a lot of games on different consoles so by allowing them to share their servers in the app. They can allow other medicos to join them and play together.</Text>
                            <Text style={styles.headingText}>Is there any fee to pay for posting a server details?</Text>
                            <Text style={styles.headingText2}>No, its free.</Text>
                            {/* <Text style={styles.headingText}>Why is there a separate game app and why are they not integrated in games module?</Text>
                            <Text style={styles.headingText2}>To keep the app size small; games consume a lot of storage space on the phone and everyone may not be into games. </Text>
                            <Text style={styles.headingText}> Are all games included in 1 app or do they have to be downloaded separately?</Text>
                            <Text style={styles.headingText2}>There’s only one app for all the games. Inside the app, users can download whichever game they want to play.</Text> */}
                            <Text style={styles.headingText}>Can we invite non medicos in the gaming app?</Text>
                            <Text style={styles.headingText2}>Yes gaming app is for everyone but even non medicos will have to go through identification process.</Text>
                        </ScrollView>
                    </View>
                )
            case 'Classified':
                return (
                    <View style={{ height: SCREEN_HEIGHT * 0.6, marginBottom: "5%" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.headingText}>What is the purpose of classified and how does it work?</Text>
                            <Text style={styles.headingText2}>It’s a P2P system where a person sells directly to another person. The main purpose is to facilitate users with the additional option of buying or selling books, household items, medical equipment and so on.</Text>
                            <Text style={styles.headingText}>Do medicos connect charge anything for buying and selling on classified?</Text>
                            <Text style={styles.headingText2}>No, we don’t charge anything.</Text>
                            <Text style={styles.headingText}>Do medicos connect charge anything for buying and selling on classified?</Text>
                            <Text style={styles.headingText2}>No, we don’t charge anything.</Text>
                            <Text style={styles.headingText}>What is the purpose of classified and how does it work?</Text>
                            <Text style={styles.headingText2}>It’s a p2p system where a person sells directly to another person. The main purpose to facilitate users with the additional option of buying or selling books, household items, medical equipment and so on.</Text>
                            <Text style={styles.headingText}>How many ads can a user post?</Text>
                            <Text style={styles.headingText2}>As many as they like, there is no limit on posting ads.</Text>
                            <Text style={styles.headingText}>Who is responsible for any damage or loss?</Text>
                            <Text style={styles.headingText2}>Seller and buyer will be responsible for the damages and losses, medicos connect is just providing a medium to connect medicos with each other.</Text>
                        </ScrollView>
                    </View>
                )
            case 'Connect':
                return (
                    <View style={{ marginBottom: "5%" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* <Text style={styles.headingText}>What is “bff” feature in connect?</Text>
                            <Text style={styles.headingText2}>It’s a feature where you make new friends. As medicos we frequently relocate and have to adjust in new communities all the time. This feature is to help connect like minded people and to establish new connections.</Text>
                            <Text style={styles.headingText}>Why is there gender preference option in bff?</Text>
                            <Text style={styles.headingText2}>It’s entirely up to the users to make friends with whichever gender they preferred or all genders.</Text> */}
                            <Text style={styles.headingText}>I don’t want people close to me, see me on connect?</Text>
                            <Text style={styles.headingText2}>By default, all your contacts will be blocked by importing/linking your contacts with the app (only if you give permission to the app for accessing your contacts). You can unblock them in the profile settings as per your preference.</Text>
                            <Text style={styles.headingText}>How many swipes are allowed in a day?</Text>
                            <Text style={styles.headingText2}>Every user is allowed 10 swipes a day</Text>
                            <Text style={styles.headingText}>Can number of swipes be increased?</Text>
                            <Text style={styles.headingText2}>Yes, but for that user will have to spend ampules to unlock more swipes</Text>
                            <Text style={styles.headingText}>How much will a single swipe cost?</Text>
                            <Text style={styles.headingText2}>Each swipe will cost 10 ampules.</Text>
                            <Text style={styles.headingText}>Why is there a restriction on number of swipes?</Text>
                            <Text style={styles.headingText2}>To make sure users take it seriously and spend time on persons profile before swiping onto the next one.</Text>
                            <Text style={styles.headingText}>Is my connect profile linked with my other profiles?</Text>
                            <Text style={styles.headingText2}>No, its not. All modules are disconnected from each other.</Text>
                        </ScrollView>
                    </View>
                )
            case 'Career':
                return (
                    <View style={{ height: SCREEN_HEIGHT * 0.6, marginBottom: "5%" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.headingText}>How many types of jobs are in the module?</Text>
                            <Text style={styles.headingText2}>Mainly there are 3 types of jobs which are full time, locums and researcher.</Text>
                            <Text style={styles.headingText}>What are different job modes in the module?</Text>
                            <Text style={styles.headingText2}>There are 2 modes for the best possible match and personalised search as well.</Text>
                            <Text style={styles.headingText}>Who will post these jobs?</Text>
                            <Text style={styles.headingText2}>Medical institutes such as hospitals, colleges, pharmaceuticals etc, any user or medical entity who is looking to hire a medico can post an ad.</Text>
                            <Text style={styles.headingText}>Can a user post job from within the app?</Text>
                            <Text style={styles.headingText2}>Yes, any user can post a job ad from within the app.</Text>
                            <Text style={styles.headingText}>Is medicos connect charging users for the jobs?</Text>
                            <Text style={styles.headingText2}>No, we are not charging anyone for providing jobs to the community nor are we charging medicos for applying or getting hired for a job.</Text>
                            <Text style={styles.headingText}>What is research partner in career?</Text>
                            <Text style={styles.headingText2}>The idea is to connect the medicos to conduct research and publish papers. Most students and residents are usually always short on funds but together they can bear the cost of research and publication. Researchers can also benefit by hiring students to aid in their research and thus create a source of income for our young medicos. </Text>
                        </ScrollView>
                    </View>
                )
            case 'Education':
                return (
                    <View style={{ marginBottom: "5%" }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.headingText}>Can I switch between teacher and student mode in education?</Text>
                            <Text style={styles.headingText2}>It can be done anytime from the profile settings. Anyone who thinks has a strong command over a certain topic or subject can teach other medicos irrespective of whether they are in 1st year of college or have an infinite teaching experience.</Text>
                            <Text style={styles.headingText}>Is medicos connect providing teachers for the live lectures?</Text>
                            <Text style={styles.headingText2}>No, we are not. Any medical professional either a student or a professional who wants to teach can create a profile and start teaching.</Text>
                            <Text style={styles.headingText}>Do users have to pay for the lectures?</Text>
                            <Text style={styles.headingText2}>It all depends on the teacher whether they are charging for the lecture or not.</Text>
                            <Text style={styles.headingText}>Will medicos connect deduct any %age of money from the teacher or student?</Text>
                            <Text style={styles.headingText2}>No, we are not charging anyone for anything.</Text>
                            <Text style={styles.headingText}>Can we use ampules to pay for the lectures?</Text>
                            <Text style={styles.headingText2}>Yes, you may pay via ampules.</Text>
                        </ScrollView>
                    </View>
                )
            case 'Wallet':
                return (
                    <View style={{ marginBottom: "5%", justifyContent: 'center', alignItems: 'center' }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* <Text style={styles.headingText}>FAQs for wallet coming soon</Text> */}
                            <Text style={styles.headingText}>What are ampules?</Text>
                            <Text style={styles.headingText2}>Ampules are basically virtual tokens that user buy and spend in the ecosystem withouit having to use credit card all the time.</Text>
                            <Text style={styles.headingText}>Does medicos connect save credit/debit card info?</Text>
                            <Text style={styles.headingText2}>No, we don’t save your information and everytime you use your card you will have to input your details again.</Text>
                        </ScrollView>
                    </View>
                )
            case 'Daak':
                return (
                    <View style={{ marginBottom: "5%", justifyContent: 'center', alignItems: 'center' }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* <Text style={styles.headingText2}>FAQs for daak coming soon </Text> */}
                            <Text style={styles.headingText}>What is daak?</Text>
                            <Text style={styles.headingText2}>Daak is a messenger which works as an inbox for all the modules.</Text>
                            <Text style={styles.headingText}>Does daak shows if i am online?</Text>
                            <Text style={styles.headingText2}>There is no such functionality.</Text>
                            <Text style={styles.headingText}>What are double ticks for in daak?</Text>
                            <Text style={styles.headingText2}>Double tick shows if your message has been delivered and read or not.</Text>
                            <Text style={styles.headingText}>Can we disable the double tick?</Text>
                            <Text style={styles.headingText2}>Unfortunately, not yet but in near future probably yes.</Text>
                        </ScrollView>
                    </View>
                )
            case 'Mee':
                return <View style={{ marginBottom: "5%" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.headingText}>What is MEE platform?</Text>
                        <Text style={styles.headingText2}>MEE is a platform designed for medics to promote mental health and well-being. It offers a 30-day journal, a personalized self-help daily plan, a diary, exercise plans, community support, and helplines.</Text>
                        <Text style={styles.headingText}>What are the benefits of the 30-day journal?</Text>
                        <Text style={styles.headingText2}>The 30-day journal is like a therapy journal, designed to help you explore your inner self, achieve self-awareness, and promote personal growth. It offers daily tasks and questions for free therapy, without the need to spend money on paid apps.</Text>
                        <Text style={styles.headingText}>What is the purpose of the diary feature?</Text>
                        <Text style={styles.headingText2}>The diary feature allows medics to record their personal and medical life moments, ideas, and emotions in a private digital space. It serves as a personal friend in the medical world, and you can take a trip back in time by writing in it.</Text>
                        <Text style={styles.headingText}>How can the workout benefit me?</Text>
                        <Text style={styles.headingText2}>The workout offer a personalized plan and fitness tracking for you to stay active, strong, and healthy. It also promotes physical health, which is the first step towards mental health, and can help build emotional resilience.</Text>
                        <Text style={styles.headingText}>What is the MEE Feed?</Text>
                        <Text style={styles.headingText2}>The community support feature allows medics to share their problems and troubles anonymously with other medicos who can relate and offer support. It serves as a safe place to talk and get compassionate support.</Text>
                        <Text style={styles.headingText}>Are there helplines available on the platform?</Text>
                        <Text style={styles.headingText2}>Yes, the platform offers helplines for vulnerable times, where someone is always available to listen and offer support. It is just a call away for anyone who needs it.</Text>
                        <Text style={styles.headingText}>Is there a personalized gym instructor or coach available?</Text>
                        <Text style={styles.headingText2}>Yes, the platform offers a gym/workout partner/instructor in your pocket, providing basic workout plans without equipment to help improve your physical and mental health.</Text>
                        <Text style={styles.headingText}>Can writing in the personal diary help with healing?</Text>
                        <Text style={styles.headingText2}>Yes, writing in the personal diary has healing effects and can help clear your mind for personal development. It can also promote mental health and well-being.</Text>
                        <Text style={styles.headingText}>Is the platform free?</Text>
                        <Text style={styles.headingText2}>Yes, the platform offers free therapy journal, diary, exercise plans, community support, and helplines, making it a cost-effective way to promote mental health and well-being.</Text>

                    </ScrollView>

                </View>
            case 'Pager':
                return <View style={{ marginBottom: "5%" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.headingText}>What is MC Pager?</Text>
                        <Text style={styles.headingText2}>MC Pager is a platform that allows you to stay up-to-date with the latest medical news and job opportunities.</Text>
                        <Text style={styles.headingText}>How can I use MC Pager?</Text>
                        <Text style={styles.headingText2}>You can use MC Pager to join medical news forums, create news threads, and keep up with the latest developments in the medical field.</Text>
                        <Text style={styles.headingText}>Is MC Pager free? </Text>
                        <Text style={styles.headingText2}>Yes, MC Pager is a free platform that anyone can use to stay informed about the medical world.</Text>
                        <Text style={styles.headingText}>Can I use MC Pager to find job opportunities in the medical field? </Text>
                        <Text style={styles.headingText2}>Yes, MC Pager is a great resource for finding job opportunities in the medical field. You can stay on top of the latest medical updates and job opportunities with MC Pager.</Text>
                        <Text style={styles.headingText}>Is MC Pager only for medical professionals? </Text>
                        <Text style={styles.headingText2}>No, anyone can use MC Pager to stay informed about the latest medical news and job opportunities.</Text>
                        <Text style={styles.headingText}>How often is MC Pager updated with the latest medical news?</Text>
                        <Text style={styles.headingText2}>MC Pager is updated regularly with the latest medical news and developments.</Text>
                        <Text style={styles.headingText}>Can I create my own news thread on MC Pager? </Text>
                        <Text style={styles.headingText2}>Yes, you can create your own news thread on MC Pager and share your own updates and insights with the medical community.</Text>
                        <Text style={styles.headingText}>Is MC Pager a secure platform to use? </Text>
                        <Text style={styles.headingText2}>Yes, MC Pager is a secure platform that takes user privacy and security seriously.</Text>
                    </ScrollView>

                </View>

        }
    }

    return (
        <Modal isVisible={props.visible}   >
            <View style={styles.modalContainer} >

                <View style={styles.modalBackgroundContainer}>
                    {/* <Text style={styles.headingText}>Are you sure you want to signout?</Text> */}
                    <View style={{ maxHeight: SCREEN_HEIGHT * 0.8 }}>
                        {renderView(props.module)}
                    </View>

                    <TouchableOpacity onPress={() => props.cancel()} style={styles.redBtn}>
                        <Text style={styles.whiteText}>Close</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    btnContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    btnContainer1: {
        marginTop: "5%",
        alignItems: "center",
        alignSelf: 'center'
    },
    greenbtn: {
        backgroundColor: themeStyle.COLOR_GREEN,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: "5%",
        width: SCREEN_WIDTH * 0.325
    },
    redBtn: {
        backgroundColor: themeStyle.COLOR_RED,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: "5%",
        width: SCREEN_WIDTH * 0.325
    },
    whiteText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: "white"
    },
    modalBackgroundContainer: {
        backgroundColor: "white",
        borderRadius: 25,
        padding: '10%',
        width: SCREEN_WIDTH * 0.9
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    colorText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: themeStyle.BAR_COLOR
    },
    blackText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: '#B2B2B2'
    },
    headingText: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 14,
        // marginHorizontal: "5%",
        color: '#959FAE',
    },
    headingText2: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: themeStyle.FONT_SIZE_SMALL,
        color: '#959FAE',
        marginVertical: '2%'

    }

})

export default UploadingModal;