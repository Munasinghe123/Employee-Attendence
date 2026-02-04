import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Dashboard() {
    // Dummy state
    const employeeName = 'Sankalpa Munasinghe';
    const isCheckedIn = false;
    const shiftInProgress = true;
    const location = 'Aniyakanda Primary Substation';
    const shiftTime = '08:00 AM – 04:00 PM';

    return (
        <>
            <StatusBar style="light" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ================= HERO HEADER ================= */}
                <View style={styles.heroHeader}>
                    <View style={styles.userHeader}>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                            style={styles.avatar}
                        />

                        <View>
                            <Text style={styles.greeting}>Good Morning 👋</Text>
                            <Text style={styles.name}>{employeeName}</Text>
                            <Text style={styles.date}>Wednesday, Feb 4</Text>
                        </View>
                    </View>
                </View>

                {/* ================= FLOATING CARD ================= */}
                <View style={styles.shiftCard}>
                    {/* Header Row */}
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Current Shift</Text>

                        {shiftInProgress && (
                            <View style={styles.statusPill}>
                                <Text style={styles.statusPillText}>In Progress</Text>
                            </View>
                        )}
                    </View>

                    {/* Info */}
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={18} color="#6366f1" />
                        <Text style={styles.infoText}>{location}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={18} color="#6366f1" />
                        <Text style={styles.infoText}>{shiftTime}</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Status */}
                    <View style={styles.statusRow}>
                        <View
                            style={[
                                styles.statusDot,
                                { backgroundColor: isCheckedIn ? '#22c55e' : '#ef4444' },
                            ]}
                        />
                        <Text style={styles.statusText}>
                            {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                        </Text>
                    </View>

                    {/* Action */}
                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.primaryButtonText}>
                            {isCheckedIn ? 'Check Out' : 'Check In'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f3ff',
    },

    heroHeader: {
        backgroundColor: '#4c1d95',
        paddingTop: 40,
        paddingBottom: 64,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
    },

    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginRight: 16,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.4)',
        backgroundColor: '#6366f1',
    },

    greeting: {
        fontSize: 15,
        color: '#e0e7ff',
    },

    name: {
        fontSize: 30,
        fontWeight: '800',
        color: '#ffffff',
        marginTop: 2,
    },

    date: {
        fontSize: 14,
        color: '#c7d2fe',
        marginTop: 4,
    },

    shiftCard: {
        backgroundColor: '#ffffff',
        borderRadius: 28,
        padding: 26,
        marginHorizontal: 20,
        marginTop: -40,
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 16,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },

    statusPill: {
        backgroundColor: '#eef2ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },

    statusPillText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4338ca',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    infoText: {
        marginLeft: 10,
        fontSize: 15,
        color: '#374151',
        flex: 1,
        lineHeight: 22,
    },

    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 22,
    },

    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },

    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },

    statusText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    primaryButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 20,
        borderRadius: 22,
        alignItems: 'center',
        shadowColor: '#22c55e',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.45,
        shadowRadius: 20,
        elevation: 12,
    },

    primaryButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.6,
    },
});
