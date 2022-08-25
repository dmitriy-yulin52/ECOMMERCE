import * as  React from 'react';
import playStore from '../../../assets/images/playstore.png'
import appStore from '../../../assets/images/Appstore.png'
import {Typography, Link} from "@mui/material";
import {FooterWrapper, LeftBlock, MiddleBlock, RightBlock} from "./FooterStyles";


const Footer = () => {
    return (
        <FooterWrapper>

            <LeftBlock >
                <Typography variant={'h4'} component={'h4'}>СКАЧАЙТЕ ВАШЕ ПРИЛОЖЕНИЕ</Typography>
                <Typography component={'p'}>Скачать приложение для мобильных телефонов Android и IOS</Typography>
                <img src={playStore} alt="playstore"/>
                <img src={appStore} alt="Appstore"/>
            </LeftBlock>
            <MiddleBlock>
                <Typography variant={'h1'} component={'h1'}>GORKY_52.</Typography>
                <Typography component={'p'}>Высокое качество - наш главный приоритет</Typography>
                <Typography component={'p'}>Copyrights 2022 &copy; Yulin Dmitriy</Typography>
            </MiddleBlock>
            <RightBlock>
                <Typography variant={'h4'} component={'h4'}>Связаться со мной</Typography>
                <Link href="https://t.me/gorky_52" target={'_blank'}>Telegram</Link>
            </RightBlock>
        </FooterWrapper>
    );
};

export default Footer;