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
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';
import { getGreeting, getFormattedDate } from '@/helpers/dateTime';

export default function Dashboard() {
    // Dummy state - replace with actual data from your backend/context
    const isCheckedIn = false;
    const shiftInProgress = true;
    const location = 'Aniyakanda Primary Substation';
    const shiftTime = '08:00 AM – 04:00 PM';
    
    // Weekly stats
    const totalShiftsThisWeek = 5;
    const dayShifts = 3;
    const nightShifts = 2;
    const totalHoursWorked = 32;
    const weeklyHourLimit = 45;
    const overtimeHours = 0;

    const auth = useContext(AuthContext);
    const employeeName = auth?.user?.userName || 'Employee';

    console.log('User from AuthContext:', auth?.user?.userName);

    return (
        <>
            <StatusBar style="light" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* HERO HEADER */}
                <View style={styles.heroHeader}>

                    <View style={styles.userHeader}>
                        <Image
                            source={require('../../assets/images/user.png')}
                            style={styles.avatar}
                        />

                        <View>
                            <Text style={styles.greeting}>{getGreeting()}</Text>
                            <Text style={styles.name}>{employeeName}</Text>
                            <Text style={styles.date}>{getFormattedDate()}</Text>
                        </View>
                    </View>
                </View>

                {/* MAIN CONTENT */}
                <View style={styles.content}>
                    {/* STATS ROW */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: '#EDE9FE' }]}>
                                <Ionicons name="calendar" size={20} color="#6B46C1" />
                            </View>
                            <Text style={styles.statValue}>{totalShiftsThisWeek}</Text>
                            <Text style={styles.statLabel}>This Week</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                                <Ionicons name="sunny" size={20} color="#10B981" />
                            </View>
                            <Text style={styles.statValue}>{dayShifts}</Text>
                            <Text style={styles.statLabel}>Day Shifts</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Ionicons name="moon" size={20} color="#3B82F6" />
                            </View>
                            <Text style={styles.statValue}>{nightShifts}</Text>
                            <Text style={styles.statLabel}>Night Shifts</Text>
                        </View>
                    </View>

                    {/* CURRENT SHIFT CARD */}
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

                        {/* Location Info */}
                        <View style={styles.detailRow}>
                            <View style={styles.detailIconContainer}>
                                <Ionicons name="location-outline" size={20} color="#6B7280" />
                            </View>
                            <View style={styles.detailText}>
                                <Text style={styles.detailLabel}>Location</Text>
                                <Text style={styles.detailValue}>{location}</Text>
                            </View>
                        </View>

                        {/* Time Info */}
                        <View style={styles.detailRow}>
                            <View style={styles.detailIconContainer}>
                                <Ionicons name="time-outline" size={20} color="#6B7280" />
                            </View>
                            <View style={styles.detailText}>
                                <Text style={styles.detailLabel}>Shift Time</Text>
                                <Text style={styles.detailValue}>{shiftTime}</Text>
                            </View>
                        </View>

                        {/* Status Indicator */}
                        <View style={styles.statusIndicator}>
                            <View
                                style={[
                                    styles.statusDot,
                                    { backgroundColor: isCheckedIn ? '#22c55e' : '#ef4444' },
                                ]}
                            />
                            <Text style={[
                                styles.statusText,
                                { color: isCheckedIn ? '#166534' : '#991B1B' }
                            ]}>
                                {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                            </Text>
                        </View>

                        {/* Action Button */}
                        <TouchableOpacity
                            style={styles.primaryButton}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isCheckedIn ? 'Check Out' : 'Check In'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* WEEKLY HOURS CARD */}
                    <View style={styles.quickInfoCard}>
                        <Text style={styles.quickInfoTitle}>Weekly Hours</Text>

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Total Hours</Text>
                            <Text style={styles.infoValue}>
                                {totalHoursWorked} hrs / {weeklyHourLimit} hrs
                            </Text>
                        </View>

                        <View style={styles.infoItemDivider} />

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Overtime Hours</Text>
                            <Text style={[styles.infoValue, { color: overtimeHours > 0 ? '#10B981' : '#1F2937' }]}>
                                {overtimeHours} hrs
                            </Text>
                        </View>

                        <View style={styles.infoItemDivider} />

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Remaining</Text>
                            <Text style={styles.infoValue}>
                                {weeklyHourLimit - totalHoursWorked} hrs
                            </Text>
                        </View>
                    </View>

                    {/* Bottom Spacing */}
                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    scrollContent: {
        flexGrow: 1,
    },

    // HEADER
    heroHeader: {
        backgroundColor: '#6B46C1',
        paddingTop: 50,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    menuButton: {
        width: 24,
        height: 24,
        marginBottom: 16,
    },
    menuLine: {
        width: 24,
        height: 2,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        marginBottom: 5,
    },
    dashboardTitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: '#E0E7FF',
    },
    greeting: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 3,
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 3,
    },
    date: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },

    // CONTENT
    content: {
        padding: 20,
    },

    // STATS ROW
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
    },

    // SHIFT CARD
    shiftCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    statusPill: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusPillText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E40AF',
    },

    // DETAIL ROWS
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 14,
    },
    detailIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    detailText: {
        flex: 1,
        paddingTop: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 15,
        color: '#1F2937',
        fontWeight: '500',
    },

    // STATUS INDICATOR
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 16,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
    },

    // PRIMARY BUTTON
    primaryButton: {
        backgroundColor: '#10B981',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },

    // QUICK INFO CARD
    quickInfoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 4,
    },
    quickInfoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    infoItemDivider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
    infoLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    infoValue: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
});