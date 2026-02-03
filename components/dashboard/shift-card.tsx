
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function ShiftCard() {

    type ShiftStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

    const shift: {
        location: string;
        startTime: string;
        endTime: string;
        status: ShiftStatus;
    } = {
        location: 'Aniyakanda Primary Substation',
        startTime: '08:00 AM',
        endTime: '04:00 PM',
        status: 'IN_PROGRESS',
    };

    const statusConfig: Record<
        ShiftStatus,
        { label: string; color: string }
    > = {
        NOT_STARTED: { label: 'Not started', color: '#9ca3af' },
        IN_PROGRESS: { label: 'In progress', color: '#f59e0b' },
        COMPLETED: { label: 'Completed', color: '#22c55e' },
    };

    const status = statusConfig[shift.status];

    return (
        < View style={styles.shiftCard} >
            <Text style={styles.shitfCardTitle}>Current Shift</Text>

            <View style={styles.section}>
                <Text style={styles.label}>📍 Location</Text>
                <Text style={styles.value}>{shift.location}</Text>
            </View>

            <View style={styles.row}>
                <View>
                    <Text style={styles.label}>⏰ Shift Time</Text>
                    <Text style={styles.value}>
                        {shift.startTime} – {shift.endTime}
                    </Text>
                </View>

                <View style={[styles.badge, { backgroundColor: status.color }]}>
                    <Text style={styles.badgeText}>{status.label}</Text>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({

    shiftCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginTop: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },

    shitfCardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#4c1d95',
        marginBottom: 12,
    },

    section: {
        marginBottom: 12,
    },

    label: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 2,
    },

    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#ffffff',
    },
})

export default ShiftCard
