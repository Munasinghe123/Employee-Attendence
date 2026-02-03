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

const PURPLE = '#7c3aed';


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


export default function DailyLogSheet() {
  const [step, setStep] = useState<number>(0);

  const totalSteps = 5;

  const [form, setForm] = useState<DailyLogForm>({
    date: '',
    substation: '',
    transformer01: {},
    transformer02: {},
    feeders: {},
    stationSupply: {},
    remarks: '',
  });

  function update<
    T extends FormSection,
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
            setForm((prev) => ({
              ...prev,
              date: v,
            }))
          }
        />

        <Input
          label="Primary Substation"
          value={form.substation}
          onChange={(v) => setForm((p) => ({ ...p, substation: v }))}
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
          value={form.remarks}
          onChangeText={(v) =>
            setForm((p) => ({ ...p, remarks: v }))
          }
        />
      </Section>
    </View>,
  ];

  /* ===================== UI ===================== */

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} >

      <View style={styles.formWrapper}>

        {/* PROGRESS */}
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

        {/* NAVIGATION */}
        <View style={styles.navRow}>
          <Button
            text="Back"
            onPress={() => setStep(step - 1)}
            disabled={step === 0}
          />

          {step < totalSteps - 1 ? (
            <Button
              text="Next"
              onPress={() => setStep(step + 1)}
            />
          ) : (
            <Button
              text="Submit"
              onPress={() => console.log(form)}
            />
          )}
        </View>

      </View>
    </ScrollView>
  );
}

/* ===================== COMPONENTS ===================== */

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
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
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


/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    padding: 16,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressWrap: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: PURPLE,
    borderRadius: 4,
  },
  stepText: {
    color: PURPLE,
    fontWeight: '600',
    marginBottom: 12,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    color: PURPLE,
    marginVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputWrap: {
    width: '48%',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    width: '100%',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
  },

  buttonTextDisabled: {
    color: '#9ca3af',
  },
  formWrapper: {
  width: '90%',
  maxWidth: 420,
  alignSelf: 'center',

  borderWidth: 1,
  borderColor: '#7c3aed',  
  borderRadius: 12,

  padding: 30,
  backgroundColor: '#ffffff',
},


});
