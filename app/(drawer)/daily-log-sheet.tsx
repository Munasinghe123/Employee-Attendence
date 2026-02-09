import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import DateInput from '@/components/daily-log-sheet/date-input';
import TimeInput from '@/components/daily-log-sheet/time-input';

const PURPLE = '#7c3aed';

/* TYPES */

type TransformerData = {
  kv33?: string;
  kv11?: string;
  amps11?: string;
  tap?: string;
  pf?: string;
};

type Feeders = {
  f1?: string;
  f2?: string;
  f3?: string;
  f4?: string;
  f5?: string;
  f6?: string;
  f7?: string;
};

type StationSupply = {
  voltage?: string;
  amps?: string;
};

type DailyLogForm = {
  date: string;
  time: string;
  substation: string;
  transformer01: TransformerData;
  transformer02: TransformerData;
  feeders: Feeders;
  stationSupply: StationSupply;
  remarks: string;
};

type FormSection = keyof Omit<
  DailyLogForm,
  'date' | 'substation' | 'remarks'
>;

/*  SCREEN  */

export default function DailyLogSheet() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const [form, setForm] = useState<DailyLogForm>({
    date: '',
    time: '',
    substation: '',
    transformer01: {},
    transformer02: {},
    feeders: {},
    stationSupply: {},
    remarks: '',
  });

  type ObjectSections =
  | 'transformer01'
  | 'transformer02'
  | 'feeders'
  | 'stationSupply';

  function update<
    T extends ObjectSections,
    K extends keyof DailyLogForm[T]
  >(section: T, field: K, value: string) {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  const steps = [
    /* STEP 1 */
    <View key="step1">
      <Section title="Sheet Information">
        <DateInput
          label="Date"
          value={form.date}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, date: v }))
          }
        />
        <TimeInput
          label="Time"
          value={form.time}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, time: v }))
          }
        />

        <Input
          label="Primary Substation"
          value={form.substation}
          onChange={(v) =>
            setForm((p) => ({ ...p, substation: v }))
          }
        />
      </Section>
    </View>,

    /* STEP 2 */
    <View key="step2">
      <Section title="Transformer 01">
        <Input label="33kV Voltage" onChange={(v) => update('transformer01', 'kv33', v)} />
        <Input label="11kV Voltage" onChange={(v) => update('transformer01', 'kv11', v)} />
        <Input label="11kV Amps" onChange={(v) => update('transformer01', 'amps11', v)} />
        <Input label="Tap Position" onChange={(v) => update('transformer01', 'tap', v)} />
        <Input label="P.F" onChange={(v) => update('transformer01', 'pf', v)} />
      </Section>
    </View>,

    /* STEP 3 */
    <View key="step3">
      <Section title="Transformer 02">
        <Input label="33kV Voltage" onChange={(v) => update('transformer02', 'kv33', v)} />
        <Input label="11kV Voltage" onChange={(v) => update('transformer02', 'kv11', v)} />
        <Input label="11kV Amps" onChange={(v) => update('transformer02', 'amps11', v)} />
        <Input label="Tap Position" onChange={(v) => update('transformer02', 'tap', v)} />
        <Input label="P.F" onChange={(v) => update('transformer02', 'pf', v)} />
      </Section>
    </View>,

    /* STEP 4 */
    <View key="step4">
      <Section title="Outgoing Feeders">
        {(['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'] as const).map((f) => (
          <Input key={f} label={f.toUpperCase()} onChange={(v) => update('feeders', f, v)} />
        ))}
      </Section>

      <Section title="Station Supply">
        <Input label="Voltage" onChange={(v) => update('stationSupply', 'voltage', v)} />
        <Input label="Amps" onChange={(v) => update('stationSupply', 'amps', v)} />
      </Section>
    </View>,

    /* STEP 5 */
    <View key="step5">
      <Section title="Remarks">
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Additional notes..."
          value={form.remarks}
          onChangeText={(v) =>
            setForm((p) => ({ ...p, remarks: v }))
          }
        />
      </Section>
    </View>,
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.formWrapper}>
        {/* Progress */}
        <View style={styles.progressWrap}>
          <View
            style={[
              styles.progressBar,
              { width: `${((step + 1) / totalSteps) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.stepText}>
          Step {step + 1} of {totalSteps}
        </Text>

        {steps[step]}

        {/* Navigation */}
        <View style={styles.navRow}>
          <Button
            text="Back"
            disabled={step === 0}
            onPress={() => setStep(step - 1)}
          />
          <Button
            text={step === totalSteps - 1 ? 'Submit' : 'Next'}
            onPress={() =>
              step === totalSteps - 1
                ? console.log(form)
                : setStep(step + 1)
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

/*  COMPONENTS  */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Text style={styles.section}>{title}</Text>
      <View style={styles.grid}>{children}</View>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
        keyboardType="numeric"
      />
    </View>
  );
}

function Button({
  text,
  onPress,
  disabled = false,
}: {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
      ]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

/*  STYLES */

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f3ff',
  },
  content: {
    paddingVertical: 32,
    alignItems: 'center',
  },

  formWrapper: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,

    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  progressWrap: {
    height: 6,
    backgroundColor: '#ede9fe',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: PURPLE,
    borderRadius: 6,
  },

  stepText: {
    color: PURPLE,
    fontWeight: '700',
    marginBottom: 16,
  },

  section: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  inputWrap: {
    width: '48%',
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    color: '#6b7280',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  textArea: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    width: '100%',
  },

  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  button: {
    backgroundColor: PURPLE,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  buttonTextDisabled: {
    color: '#9ca3af',
  },
});