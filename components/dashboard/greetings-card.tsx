import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, StyleSheet } from 'react-native'


function GreetingsCard() {

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    });

    return (

        <LinearGradient
            colors={['#8b5cf6', '#4c1d95']}
            style={styles.greetingCard}
        >
            <Text style={styles.welcome}>Good Morning 👋</Text>
            <Text style={styles.name}>John Silva</Text>
            <Text style={styles.date}>{today}</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    greetingCard: {
        borderRadius: 24,
        paddingVertical: 28,
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    },

    welcome: {
        fontSize: 14,
        color: '#e9d5ff',
        marginBottom: 6,
        letterSpacing: 0.5,
    },

    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 4,
    },

    date: {
        fontSize: 13,
        color: '#ddd6fe',
    },
})

export default GreetingsCard
