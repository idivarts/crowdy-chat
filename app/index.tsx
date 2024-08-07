import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/contexts';

const Index = () => {
    const router = useRouter();
    const { isLoading, session } = useAuthContext();

    useEffect(() => {
        const checkSession = async () => {
            try {
                if (session) {
                    router.replace('/(main)/(campaigns)/campaigns');
                } else {
                    router.replace('/(auth)/login');
                }
            } catch (error) {
                console.error('Failed to fetch session', error);
            }
        };

        if (!isLoading)
            checkSession();
    }, [session, isLoading]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return null;
};

export default Index;