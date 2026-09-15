"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button as AriaButton,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker as AriaDatePicker,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  Dialog as AriaDialog,
  Group,
  Heading,
  Label as AriaLabel,
  Popover as AriaPopover,
  RangeCalendar,
  TimeField as AriaTimeField,
  type DatePickerProps as AriaDatePickerProps,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
} from "react-aria-components";

type Common = { label: string; description?: string; error?: string };
export type DatePickerProps = Common &
  Omit<AriaDatePickerProps<DateValue>, "children" | "className">;
export type DateRangePickerProps = Common &
  Omit<AriaDateRangePickerProps<DateValue>, "children" | "className">;
export type TimePickerProps = Common &
  Omit<AriaTimeFieldProps<TimeValue>, "children" | "className">;

function CalendarHeader() {
  return (
    <header className="og-calendar__header">
      <AriaButton
        slot="previous"
        className="og-calendar__nav"
        aria-label="Bulan sebelumnya"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </AriaButton>
      <Heading className="og-calendar__heading" />
      <AriaButton slot="next" className="og-calendar__nav" aria-label="Bulan berikutnya">
        <ChevronRight size={16} aria-hidden="true" />
      </AriaButton>
    </header>
  );
}

function CalendarPanel({ range = false }: { range?: boolean }) {
  return (
    <AriaPopover className="og-date__popover" placement="bottom start">
      <AriaDialog className="og-calendar__dialog">
        {range ? (
          <RangeCalendar className="og-calendar">
            <CalendarHeader />
            <CalendarGrid className="og-calendar__grid">
              {(date) => <CalendarCell date={date} className="og-calendar__cell" />}
            </CalendarGrid>
          </RangeCalendar>
        ) : (
          <Calendar className="og-calendar">
            <CalendarHeader />
            <CalendarGrid className="og-calendar__grid">
              {(date) => <CalendarCell date={date} className="og-calendar__cell" />}
            </CalendarGrid>
          </Calendar>
        )}
      </AriaDialog>
    </AriaPopover>
  );
}

function Help({ description, error }: Pick<Common, "description" | "error">) {
  return (
    <>
      {description ? <p className="og-field__description">{description}</p> : null}
      {error ? (
        <p className="og-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

function DateTrigger({ range = false }: { range?: boolean }) {
  return (
    <Group className="og-date__trigger">
      <DateInput slot={range ? "start" : undefined} className="og-date__input">
        {(segment) => <DateSegment segment={segment} className="og-date__segment" />}
      </DateInput>
      {range ? (
        <>
          <span className="og-date__separator" aria-hidden="true">
            –
          </span>
          <DateInput slot="end" className="og-date__input">
            {(segment) => <DateSegment segment={segment} className="og-date__segment" />}
          </DateInput>
        </>
      ) : null}
      <AriaButton className="og-date__button" aria-label="Buka kalender">
        <CalendarDays size={16} aria-hidden="true" />
      </AriaButton>
    </Group>
  );
}

export function DatePicker({ label, description, error, ...props }: DatePickerProps) {
  return (
    <AriaDatePicker
      {...props}
      className="og-field og-date"
      isInvalid={Boolean(error) || props.isInvalid}
    >
      <AriaLabel className="og-field__label">{label}</AriaLabel>
      <DateTrigger />
      <Help description={description} error={error} />
      <CalendarPanel />
    </AriaDatePicker>
  );
}

export function DateTimePicker({ label, description, error, ...props }: DatePickerProps) {
  return (
    <AriaDatePicker
      {...props}
      granularity="minute"
      className="og-field og-date"
      isInvalid={Boolean(error) || props.isInvalid}
    >
      <AriaLabel className="og-field__label">{label}</AriaLabel>
      <DateTrigger />
      <Help description={description} error={error} />
      <CalendarPanel />
    </AriaDatePicker>
  );
}

export function DateRangePicker({
  label,
  description,
  error,
  ...props
}: DateRangePickerProps) {
  return (
    <AriaDateRangePicker
      {...props}
      className="og-field og-date"
      isInvalid={Boolean(error) || props.isInvalid}
    >
      <AriaLabel className="og-field__label">{label}</AriaLabel>
      <DateTrigger range />
      <Help description={description} error={error} />
      <CalendarPanel range />
    </AriaDateRangePicker>
  );
}

export function TimePicker({ label, description, error, ...props }: TimePickerProps) {
  return (
    <AriaTimeField
      {...props}
      className="og-field og-date"
      isInvalid={Boolean(error) || props.isInvalid}
    >
      <AriaLabel className="og-field__label">{label}</AriaLabel>
      <DateInput className="og-date__trigger og-date__input">
        {(segment) => <DateSegment segment={segment} className="og-date__segment" />}
      </DateInput>
      <Help description={description} error={error} />
    </AriaTimeField>
  );
}
