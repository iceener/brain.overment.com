export default {
    base: '/',
    title: 'brain.overment.com',
    description: 'Everything I know',
    head: [
        ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/img/favicons/mstile-150x150.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/img/favicons/favicon-32x32.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/img/favicons/favicon-16x16.png"}],
        ['link', { rel: "manifest", href: "/assets/img/favicons/site.webmanifest"}],
        ['link', { rel: "mask-icon", href: "/assets/img/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
        ['link', { rel: "shortcut icon", href: "/assets/img/favicons/favicon.ico"}],
        ['script', { src: "https://cdn.tailwindcss.com" }],
        ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
        ['meta', { name: "msapplication-config", content: "/assets/img/favicons/browserconfig.xml"}],
        ['meta', { name: "theme-color", content: "#ffffff"}],
        // ['script', { src: "https://app.easycart.pl/login.js?type=block&id=prod_Lzwxc8kvKviDae" }],
        // ['script', { type: 'application/javascript' }, '!window._EC_HASH_7cfdafc7e91e7af57d5ce7fe5f7e6136 && (location.href = "https://app.easycart.pl/r/prod_Lzwxc8kvKviDae");']
        ['script', { type: 'application/javascript' }, `
                setTimeout(function() {
                    const searchBox = document.querySelector('.search-text');
                    if (searchBox) {
                        searchBox.textContent = 'Search (⌘K)';
                        document.addEventListener('keydown', (e) => {
                            if (e.metaKey && e.keyCode === 75) {
                                searchBox.click();
                            }
                        });
                    }
                }, 200);
        `]
    ],
    themeConfig: {
        logo: '/assets/img/logo-symbol.svg',
        sidebar: [
            {
                text: 'Start',
                items: [
                    { text: 'Start here', link: '/' }
                ]
            },
            {
                text: 'Core',
                items: [
                    { text: 'Direction', link: '/Core/Direction.md' },
                    { text: 'Learning System', link: '/Core/Learning System.md' },
                    { text: 'Process', link: '/Core/Process.md' },
                    { text: 'Knowing thyself', link: '/Core/Knowing thyself.md' },
                    { text: 'Values', link: '/Core/Values.md' },
                ]
            },
            {
                text: 'Projects',
                items: [
                    {text: 'eduweb & ahoy!', link: '/Projects/eduweb.md'},
                    {text: 'easy_', link: '/Projects/easy_.md'},
                    {text: 'Alice', link: '/Projects/Alice.md'},
                    {text: 'overment', link: '/Projects/overment.md'},
                    {text: 'Automation House', link: '/Projects/Automation House.md'},
                    {text: 'Design Maestro', link: '/Projects/Design Maestro.md'},
                ]
            },
            {
                text: 'Tools', link: '/Tools/Tools.md',
                items: [
                    {text: 'Apps', link: '/Tools/Apps.md'},
                    {text: 'Automation', link: '/Tools/Automation.md'},
                    {text: 'Hardware', link: '/Tools/Hardware.md'},
                ]
            },
            { text: 'Mental Models',
                collapsible: true,
                collapsed: true,
                items: [
                    { text: 'Mental Models', link: '/Mental Models/Mental Models.md' },
                    { text: '20 Mile March', link: '/Mental Models/20 Mile March.md' },
                    { text: 'Authority Bias', link: '/Mental Models/Authority Bias.md' },
                    { text: 'BHAG', link: '/Mental Models/BHAG.md' },
                    { text: 'Commitment Bias', link: '/Mental Models/Commitment Bias.md' },
                    { text: 'Ergodicity', link: '/Mental Models/Ergodicity.md' },
                    { text: 'Genius of the AND', link: '/Mental Models/Genius of the AND.md' },
                    { text: 'Leverage', link: '/Mental Models/Leverage.md' },
                    { text: 'Mental Models', link: '/Mental Models/Mental Models.md' },
                    { text: 'Status Quo Bias', link: '/Mental Models/Status Quo Bias.md' },
                    { text: 'The Compound Effect', link: '/Mental Models/The Compound Effect.md' },
                ]
            },
            { text: 'Books',
                collapsible: true,
                collapsed: true,
                items: [
                    { text: 'All I want to Know is Where Im Going to Die So Ill Never Go There', link: '/Books/All I want to Know is Where Im Going to Die So Ill Never Go There.md' },
                    { text: 'Almanack of Naval Ravikant', link: '/Books/Almanack of Naval Ravikant.md' },
                    { text: 'Antifragile', link: '/Books/Antifragile.md' },
                    { text: 'Atomic Habits', link: '/Books/Atomic Habits.md' },
                    { text: 'Black Box Thinking', link: '/Books/Black Box Thinking.md' },
                    { text: 'Blink', link: '/Books/Blink.md' },
                    { text: 'Books', link: '/Books/Books.md' },
                    { text: 'Cant Hurt Me', link: '/Books/Cant Hurt Me.md' },
                    { text: 'Chop Wood, Carry Water', link: '/Books/Chop Wood, Carry Water.md' },
                    { text: 'Daring Greatly', link: '/Books/Daring Greatly.md' },
                    { text: 'Deep Work', link: '/Books/Deep Work.md' },
                    { text: 'Extreme Ownership', link: '/Books/Extreme Ownership.md' },
                    { text: 'Fooled by Randomness', link: '/Books/Fooled by Randomness.md' },
                    { text: 'Gladiators Pirates and Games of Trust', link: '/Books/Gladiators Pirates and Games of Trust.md' },
                    { text: 'Great by Choice', link: '/Books/Great by Choice.md' },
                    { text: 'Grit', link: '/Books/Grit.md' },
                    { text: 'How to Fail at Almost Anything and Still Win Big', link: '/Books/How to Fail at Almost Anything and Still Win Big.md' },
                    { text: 'Hyperfocus', link: '/Books/Hyperfocus.md' },
                    { text: 'Insanely Simple', link: '/Books/Insanely Simple.md' },
                    { text: 'Letting Go', link: '/Books/Letting Go.md' },
                    { text: 'Pound the Stone', link: '/Books/Pound the Stone.md' },
                    { text: 'Principles', link: '/Books/Principles.md' },
                    { text: 'Range', link: '/Books/Range.md' },
                    { text: 'Rebel Ideas', link: '/Books/Rebel Ideas.md' },
                    { text: 'Seeking Wisdom', link: '/Books/Seeking Wisdom.md' },
                    { text: 'Simplify', link: '/Books/Simplify.md' },
                    { text: 'Skin in The Game', link: '/Books/Skin in The Game.md' },
                    { text: 'That WIll Never Work', link: '/Books/That WIll Never Work.md' },
                    { text: 'The Code of The Extraordinary Mind', link: '/Books/The Code of The Extraordinary Mind.md' },
                    { text: 'The Dip', link: '/Books/The Dip.md' },
                    { text: 'The Great Mental Models', link: '/Books/The Great Mental Models.md' },
                    { text: 'The Happines Advantage', link: '/Books/The Happines Advantage.md' },
                    { text: 'The Infinite Game', link: '/Books/The Infinite Game.md' },
                    { text: 'Think Again', link: '/Books/Think Again.md' },
                    { text: 'Think Like a Rocket Scientist', link: '/Books/Think Like a Rocket Scientist.md' },
                    { text: 'Understanding the INFJ Personality Type', link: '/Books/Understanding the INFJ Personality Type.md' },
                    { text: 'Untitled', link: '/Books/Untitled.md' },
                    { text: 'War of Art', link: '/Books/War of Art.md' },
                    { text: 'Way of The Peaceful Warrior', link: '/Books/Way of The Peaceful Warrior.md' },
                ]
            }
        ]
    }
}
