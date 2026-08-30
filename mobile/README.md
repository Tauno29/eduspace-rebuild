# EduSpace Android App

This directory contains the Android-focused Expo React Native application for EduSpace. It is a native mobile app, not the previous responsive web shell.

## Run on Android

Install dependencies with `pnpm install`, then start Expo with `pnpm start` and open the project in an Android emulator or Expo Go. For a local Android target, use `pnpm android` when an Android SDK/emulator is available.

## Live data

Set `EXPO_PUBLIC_EDUSPACE_DATA_URL` to an authoritative JSON endpoint containing `regions`, `schools`, and `vacancyRows`. The app always displays the 14 canonical Namibian region containers, but it does not invent school counts or availability. When configured, the app refreshes live metrics every 60 seconds and Top Availability lists every school with positive available spaces.

## Profile persistence

Profile setup and Personal Information changes are stored with AsyncStorage and immediately propagate to Home and Profile on the device.

## Android identity

The configured Android package is `na.eduspace.app`. EduSpace brand assets are stored in `assets/`, with the mark used for the app icon and splash artwork.
