import React from 'react';
import { Flex } from 'antd';
import Timetable from '../components/TimeTable';
import TeacherMessageBoard from '../components/TeacherMessageBoard';

const CourseInformation = () => {
    return (
        <Flex gap="middle" align="center" justify="center" >
            <Flex gap="middle" align="center" justify="center" >
                <Timetable />
                <TeacherMessageBoard />
            </Flex>
        </Flex>
    );
};

export default CourseInformation;