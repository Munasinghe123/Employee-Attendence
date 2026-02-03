import React from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
} from 'react-native';

import GreetingsCard from '@/components/dashboard/greetings-card';
import ShiftCard from '@/components/dashboard/shift-card';
import AttendanceCard from '@/components/dashboard/attendence-card';

function Dashboard() {
    

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <GreetingsCard/>
            <ShiftCard/>
            <AttendanceCard/>
    
            
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f3ff',
        padding: 20,
    },

});


export default Dashboard;
