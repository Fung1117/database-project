import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Wellcome from '../assets/wellcomeImage.svg';
import SoonClass from '../assets/SoonClass.svg';
import TimeTable from '../assets/timeTable.jpg';

import { UserContext } from '../App';

const { Meta } = Card;

const Home = () => {

    const userContext = useContext(UserContext);

    return (
        <Flex justify="center" align="center" vertical style={{ width: '100%' }}>
            <Flex gap="middle" align="center" justify="center" style={{ width: '100%', }}>
                <Card hoverable cover={<img src={Wellcome} height={550} />} style={{ height: 650, width: '60%' }} >
                    <Meta title={`Welcome to ICMS! ${userContext.getUserName()}`} />
                </Card>
                <Flex justify="center" align="center" vertical gap={20} style={{ height: 650, width: '30%' }}>
                    <Card hoverable cover={<img src={SoonClass} height={200} />} style={{ height: 320, width: '100%' }} actions={[<Link to="/upcoming-course"><RightOutlined /></Link>]}>
                        <Meta
                            title="If you have a class soon, find all the details—classroom, teacher's message, Zoom link, and materials—all in one place."
                        />
                    </Card>
                    <Card hoverable cover={<div style={{ display: 'flex', justifyContent: 'center' }}> <img src={TimeTable} style={{ width: 200, height: 200, objectFit: 'cover' }} /></div>} style={{ height: 320, width: '100%' }} actions={[<Link to="/TimeTable"><RightOutlined /></Link>]}>
                        <Meta
                            title="No class now? Check your personal timetable anytime."
                        />
                    </Card>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Home;
