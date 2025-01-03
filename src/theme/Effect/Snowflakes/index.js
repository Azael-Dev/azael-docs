import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import Snowflakes from 'magic-snowflakes';

const SNOW_CONFIG = {
    MAX_SIZE: 16
};

const SNOW_SEASON = {
    START_MONTH: 12,
    END_MONTH: 1
};

function MagicSnowflakes() {
    const { colorMode } = useThemeConfig();
    const [theme, setTheme] = useState(colorMode.defaultMode);

    const checkSnowSeason = () => {
        const date = new Date();
        const month = date.getMonth() + 1;

        return (month === SNOW_SEASON.START_MONTH || month === SNOW_SEASON.END_MONTH);
    };

    useEffect(() => {
        const storedTheme = document.documentElement.getAttribute('data-theme');
        setTheme(storedTheme || colorMode.defaultMode);
    }, [colorMode.defaultMode]);

    useEffect(() => {
        if (checkSnowSeason()) {
            const snowColor = getComputedStyle(document.documentElement).getPropertyValue('--snowflake-color').trim();
            const snowCount = () => {
                const date = new Date();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                if (month === SNOW_SEASON.START_MONTH) {
                    return day;
                } else if (month === SNOW_SEASON.END_MONTH) {
                    const lastDay = new Date(date.getFullYear(), SNOW_SEASON.START_MONTH + 1, 0).getDate();

                    return lastDay - day;
                }
            };

            // See advanced settings: https://github.com/hcodes/snowflakes?tab=readme-ov-file#advanced-settings
            const sf = new Snowflakes({
                color: snowColor,
                count: snowCount(),
                maxSize: SNOW_CONFIG.MAX_SIZE,
            });

            return () => sf.destroy();
        }
    }, [theme, checkSnowSeason()]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.getAttribute('data-theme');
            setTheme(newTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    return null;
};

export default MagicSnowflakes;
