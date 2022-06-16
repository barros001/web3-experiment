import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type MenuItem = {
  name: string;
  description?: string;
  href: string;
  icon?: string | JSX.Element;
  children?: MenuItem[];
};

const menus: MenuItem[] = [
  {
    name: 'Ethereum',
    href: '#',
    icon: <FontAwesomeIcon icon={['fab', 'ethereum']} />,
    children: [
      {
        name: 'Wave @ Me!',
        description: 'Connect your Ethereum wallet and wave at me!',
        href: '/ethereum/wave',
        icon: '👋',
      },
      {
        name: 'Mint an NFT',
        description: 'Each unique. Each beautiful. Discover your NFT today.',
        href: '/ethereum/nft',
        icon: '🐙',
      },
      {
        name: 'NFT Game',
        description: 'Team up to protect the Metaverse!',
        href: '/ethereum/game',
        icon: '⚔️',
      },
    ],
  },
  {
    name: 'Solana',
    href: '#',
    children: [
      {
        name: 'GIF Portal',
        description: 'View your GIF collection in the metaverse ✨',
        href: '/solana/gifs',
        icon: '🖼',
      },
      {
        name: 'Emoji Store',
        description: 'The only emoji store that accepts sh*tcoins',
        href: '/solana/emoji',
        icon: '😳',
      },
    ],
  },
];
export default menus;
