import cfonts from 'cfonts';

export class LogoService {
    static getLogo() {
        const configs = [
            {
                colors: ['#00b3b3', '#004d99'],
                gradient: ['#00b3b3', '#004d99'], // Teal to Blue
            },
            {
                colors: ['#4b0082', '#9370db'],
                gradient: ['#4b0082', '#9370db'], // Indigo to Purple
            },
            {
                colors: ['#0077ff', '#0047ad'],
                gradient: ['#0077ff', '#0047ad'], // Electric Blue to Royal Blue
            },
            {
                colors: ['#ff7f50', '#ff6347'],
                gradient: ['#ff7f50', '#ff6347'], // Deep Orange to Coral
            },
            {
                colors: ['#00ffff', '#2f4f4f'],
                gradient: ['#00ffff', '#2f4f4f'], // Cyan to Dark Slate
            },
            {
                colors: ['#1de9b6', '#1dc4e9'],
                gradient: ['#1de9b6', '#1dc4e9'], // Mint Green to Cyan
            },
            {
                colors: ['#ff6f91', '#ff9671'],
                gradient: ['#ff6f91', '#ff9671'], // Pink to Soft Orange
            },
            {
                colors: ['#6a11cb', '#2575fc'],
                gradient: ['#6a11cb', '#2575fc'], // Purple to Blue
            },
            {
                colors: ['#f7971e', '#ffd200'],
                gradient: ['#f7971e', '#ffd200'], // Yellow-Orange Gradient
            },
            {
                colors: ['#fc5c7d', '#6a82fb'],
                gradient: ['#fc5c7d', '#6a82fb'], // Pink to Blue Gradient
            },
            {
                colors: ['#ff6e7f', '#bfe9ff'],
                gradient: ['#ff6e7f', '#bfe9ff'], // Soft pink to sky blue
            },
            {
                colors: ['#ff9966', '#ff5e62'],
                gradient: ['#ff9966', '#ff5e62'], // Warm orange to coral
            },
            {
                colors: ['#56ccf2', '#2f80ed'],
                gradient: ['#56ccf2', '#2f80ed'], // Bright sky blue to deep blue
            },
            {
                colors: ['#11998e', '#38ef7d'],
                gradient: ['#11998e', '#38ef7d'], // Emerald green gradients
            },
            {
                colors: ['#ee7752', '#e73c7e'],
                gradient: ['#ee7752', '#e73c7e'], // Vibrant orange to pinkish purple
            },
            {
                colors: ['#765285', '#b23aee'],
                gradient: ['#765285', '#b23aee'], // Deep purple to orchid
            },
            {
                colors: ['#2193b0', '#6dd5ed'],
                gradient: ['#2193b0', '#6dd5ed'], // Ocean blues gradient
            },
            {
                colors: ['#cc2b5e', '#753a88'],
                gradient: ['#cc2b5e', '#753a88'], // Raspberry to dark violet
            },
            {
                colors: ['#42275a', '#734b6d'],
                gradient: ['#42275a', '#734b6d'], // Dark mauve purple gradients
            },
            {
                colors: ['#43cea2', '#185a9d'],
                gradient: ['#43cea2', '#185a9d'], // Teal green to navy blue
            },

        ];

        for (let i = 0; i < 10; i++) {
            const config = configs[i];

            cfonts.say('Monkr', {
                font: 'block',
                align: 'center',
                colors: config.colors,
                gradient: config.gradient,
                background: 'transparent',
                letterSpacing: 1.5,
                lineHeight: 1,
                space: true,
                maxLength: '0',
                independentGradient: false,
                transitionGradient: true,
            });
            console.log(`\n--- Variant ${i + 1} ---\n`);
        }
    }


}
