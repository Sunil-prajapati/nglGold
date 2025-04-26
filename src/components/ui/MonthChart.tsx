import React, {useMemo} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {THEME_COLORS} from '../../constants/ThemeColors';
import Typography from '../Typography';

interface MonthChartProps {
  month?: Date;
  className?: string;
  data?: Record<string, Record<string, number>>; // Added data prop
}

const MonthChart: React.FC<MonthChartProps> = ({
  month = new Date(),
  className = '',
  data,
}) => {
  const {theme} = useTheme();
  const colors = THEME_COLORS[theme];


  const chartData = data;
  const timeSlots = useMemo(() => {
    const slots = [];
    const startHour = 8;
    const startMinute = 0;
    const endHour = 24;
    const endMinute = 0;
    
    for (let h = startHour; h <= endHour; h++) {
      for (let m = h === startHour ? startMinute : 0; m < 60; m += 15) {
        if (h === endHour && m > endMinute) break;
        
        const hour = h % 12 === 0 ? 12 : h % 12;
        const period = h < 12 ? 'AM' : 'PM';
        slots.push(`${hour}:${m.toString().padStart(2, '0')} ${period}`);
      }
    }
    return slots;
  }, []);

  // Generate dates for the current month
  const dates = useMemo(() => {
    const daysInMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0,
    ).getDate();
    const dates = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      dates.push(date);
    }
    return dates;
  }, [month]);

  const getColorForValue = (value: number) => {
    switch (value) {
      case 0: return '#f5f5f5'; // Light gray for 0
      case 1: return '#FF0000'; // Red for 1
      case 2: return '#00FF00'; // Green for 2
      case 3: return '#0000FF'; // Blue for 3
      case 4: return '#FFA500'; // Orange for 4
      case 5: return '#800080'; // Purple for 5
      case 6: return '#00FFFF'; // Cyan for 6
      case 7: return '#FF00FF'; // Magenta for 7
      case 8: return '#FFFF00'; // Yellow for 8
      case 9: return '#A52A2A'; // Brown for 9
      default: return '#f5f5f5'; // Default to light gray
    }
  };

  // Replace the random data generation with data lookup
  const getDataValue = (date: Date, timeSlot: string): number => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return chartData[dateStr]?.[timeSlot] ?? 0;
  };
  return (
    <View className={`${className}`} style={styles.container}>
      {/* Fixed top-left corner cell */}
      <View style={styles.cornerCell}>
        <Typography variant="caption" color={colors.text}>
          Time / Date
        </Typography>
      </View>
      
      {/* Fixed date header row (sticky top) */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dateHeaderContainer}
      >
        <View style={styles.headerRow}>
          {dates.map((date, index) => (
            <View key={`date-${index}`} style={styles.dateHeaderCell}>
              <Typography variant="caption" color={colors.text}>
                {date.getDate()}
              </Typography>
              <Typography variant="caption" color={colors.text}>
                {date.toLocaleString('default', {weekday: 'short'})}
              </Typography>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Fixed time column (sticky left) */}
      <View style={styles.timeColumnContainer}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View>
            {timeSlots.map((timeSlot, timeIndex) => (
              <View key={`time-${timeIndex}`} style={styles.timeCell}>
                <Typography variant="caption" color={colors.text}>
                  {timeSlot}
                </Typography>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      
      {/* Main scrollable content area */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.mainContentContainer}
      >
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View>
            {timeSlots.map((timeSlot, timeIndex) => (
              <View key={`time-${timeIndex}`} style={styles.row}>
                {dates.map((date, dateIndex) => {
                  const value = getDataValue(date, timeSlot);
                  return (
                    <View
                      key={`cell-${timeIndex}-${dateIndex}`}
                      style={[
                        styles.dataCell,
                        {backgroundColor: getColorForValue(value)},
                      ]}>
                      <Text style={styles.cellText}>{value}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    height: "94%",
    position: 'relative',
  },
  cornerCell: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderBottomColor: '#ddd',
    zIndex: 3,
  },
  dateHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 80,
    right: 0,
    height: 50,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 2,
  },
  timeColumnContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: 80,
    bottom: 0,
    backgroundColor: '#f9f9f9',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    zIndex: 1,
  },
  mainContentContainer: {
    position: 'absolute',
    top: 50,
    left: 80,
    right: 0,
    bottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    height: 50,
  },
  dateHeaderCell: {
    width: 50,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeCell: {
    width: 80,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dataCell: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  cellText: {
    fontWeight: 'bold',
  },
});

export default MonthChart;
