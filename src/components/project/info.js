import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Demensions,
    screen,
    STATUS_BAR_HEIGHT,
    NAVBSR_HEIGHT,
    toastUtil
} from '../../constants/util';
import NavigationBar from '../navigation/NavigationBar';

export default class InfoPage extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.flex}>
                <NavigationBar
                    title={'功能介绍'}
                    style={{
                        backgroundColor: '#fff'
                    }}
                    leftButton={
                        <TouchableOpacity style={[styles.NavBarBtn]} activeOpacity={0.6} onPress={() => this.props.navigation.goBack()} >
                            <Image style={{ width: 44, height: 44 }} source={require("../../assets/image/icon_back.png")} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <Text style={styles.title}>腾讯三大AI实验室  强大的技术基石</Text>
                    <Text style={styles.summary}>AI LAB</Text>
                    <Text style={styles.text}>腾讯AI Lab作为企业级AI实验室，依托腾讯丰富应用场景、海量大数据、强大计算能力和一流科技人才，专注于AI基础研究和应用探索的结合，希望为腾讯打造全面AI能力，向愿景“让AI无处不在”迈步。{"\n"}{"\n"}
我们的基础研究方向包括计算机视觉、语音识别、自然语言处理和机器学习，应用探索结合了腾讯场景与业务优势，为内容、游戏、社交和平台工具型AI四类，目前已打造出围棋AI“绝艺”，技术也被微信、QQ、天天快报和QQ音乐等上百个腾讯产品使用。{"\n"}{"\n"}
团队有70余位来自世界知名院校的科学家，及300多位经验丰富的应用工程师组成，由机器学习和大数据领域专家张潼博士，及语音识别及深度学习专家俞栋博士，并与世界顶级院校与机构合作，共同打造“产学研用一体”的AI生态。</Text>
                    <Text style={styles.summary}>优图实验室</Text>
                    <Text style={styles.text}>腾讯旗下顶级的机器学习研发团队，专注于图像处理、模式识别、深度学习。{"\n"}{"\n"}
在人脸识别、图像识别、医疗AI、交通、OCR等领域积累了领先的技术水平和完整的解决方案。</Text>
                    <Text style={styles.summary}>微信AI</Text>
                    <Text style={styles.text}>微信AI致力于为语音识别、自然语言处理、计算机视觉、数据挖掘和机器学习等人工智能技术的发展带来革命性进步。{"\n"}{"\n"}</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    NavBarBtn: {
        width: 44,
        height: NAVBSR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 20,
        color: '#000'
    },
    images: {
        paddingVertical: 10,
    },
    summary: {
        fontSize: 1,
        lineHeight: 22,
        paddingTop: 20,
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#000'
    },
    text: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'justify',
        lineHeight: 28,
        color: '#545454',
        fontWeight: '100',
    }
});
