import React, { useMemo } from 'react';
import './style.scss';

export enum SocialNetwork {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  OK = 'ok',
  TIKTOK = 'tiktok',
  VK = 'vk',
  YOUTUBE = 'youtube',
  GOOGLE_PLUS = 'googlePlus',
}

const socialNetworkIcons = {
  [SocialNetwork.FACEBOOK]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>Facebook</title>
      <path d='M.622 27.126C.078 26.387 0 24.444 0 13.718 0 1.244 0 1.205.855.622 1.595.078 3.538 0 14.27 0c12.48 0 12.52 0 13.103.855.544.738.622 2.681.622 13.368 0 14.884.389 13.758-4.977 13.758H19.44V17.488h1.75c1.944 0 1.944-.039 2.294-2.798l.233-1.866H19.44V11.31c0-2.37.272-2.72 2.372-2.993l1.905-.272V4.353l-1.633-.234c-4.666-.66-7.31 1.75-7.31 6.568v2.137h-3.499v4.664h3.5V27.98H8.008c-6.57 0-6.804-.04-7.387-.855z' />
    </svg>
  ),
  [SocialNetwork.INSTAGRAM]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>Instagram</title>
      <g>
        <path d='M5.416 27.337c-2.327-.738-4.19-2.64-4.888-5.01-.814-2.68-.814-14.138-.039-16.74.776-2.448 2.638-4.351 5.044-5.05C8.21-.28 19.615-.28 22.292.537c2.405.699 4.267 2.602 5.043 5.05.776 2.602.776 14.06-.039 16.74-.698 2.408-2.599 4.272-5.043 5.05-2.522.737-14.393.737-16.837-.04zm14.47-2.136c4.695-.582 5.626-2.486 5.626-11.264 0-8.778-.931-10.681-5.625-11.264-3.414-.466-8.535-.466-11.95 0-4.693.583-5.624 2.486-5.624 11.264 0 8.545 1.008 10.72 5.237 11.264 3.259.427 9.194.427 12.337 0z' />
        <path d='M10.266 19.996c-4.5-2.719-4.462-9.632.077-12.196 2.095-1.165 5.043-1.165 7.138 0 4.54 2.564 4.578 9.555.078 12.196-2.173 1.282-5.199 1.282-7.293 0zm6.013-2.058c1.241-.738 2.289-2.641 2.289-4.195 0-2.292-2.367-4.467-4.85-4.467-2.289 0-4.461 2.37-4.461 4.855 0 3.302 4.073 5.516 7.022 3.807zm3.918-10.293c-1.125-1.127-.078-2.797 1.552-2.564 1.63.233 1.241 3.03-.427 3.03-.35 0-.853-.194-1.125-.466z' />
      </g>
    </svg>
  ),
  [SocialNetwork.OK]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>Одноклассники</title>
      <g>
        <path d='M3.316 28.255C1.904 27.98.492 26.25.256 24.482.1 23.578.062 18.43.14 13.007.257 2.475.335 2.003 2.375.942 3.786.196 24.61.196 26.022.982c1.96 1.021 2.078 1.69 2.078 13.4 0 8.214-.118 11.122-.51 11.83-1.098 2.043-1.45 2.121-12.823 2.16-5.804.04-10.98 0-11.451-.117zm9.137-5.345 1.686-1.729 1.294 1.336c1.765 1.847 2.51 2.2 3.451 1.69 1.177-.629.941-2.044-.588-3.537-1.45-1.415-1.686-1.965-.823-1.965.98 0 2.588-1.611 2.588-2.593 0-1.219-1.451-1.612-3.059-.786-1.53.786-4.078.786-5.608 0-1.804-.904-2.863-.59-3.02.864-.117 1.1.04 1.336 1.451 1.965.863.432 1.608.865 1.608.982 0 .118-.627.944-1.372 1.808-1.53 1.808-1.726 2.633-.667 3.223 1.059.628 1.255.55 3.059-1.258zm4.51-8.763c1.568-.786 2.862-3.616 2.51-5.384-.824-3.812-4.785-5.738-7.922-3.812-1.49.904-2.275 2.083-2.667 3.851-.353 1.611.902 4.323 2.432 5.266 1.372.865 4.117.904 5.647.079z' />
        <path d='M13.002 10.924c-1.177-.943-.824-2.711.588-3.065 1.373-.354 2.079.04 2.392 1.257.236.826.079 1.219-.627 1.808-.47.393-1.02.708-1.177.708-.156 0-.705-.315-1.176-.708z' />
      </g>
    </svg>
  ),
  [SocialNetwork.TIKTOK]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>TikTok</title>
      <path d='M2.102 27.544C.156 26.688 0 25.6 0 14.006 0 1.946.156 1.206 2.609.467 3.582.156 7.67.078 14.873.156l10.824.117 1.051 1.089 1.09 1.05.117 10.816c.156 12.332 0 13.46-2.063 14.316-1.869.778-21.998.778-23.79 0zm12.654-4.785c2.22-1.712 2.57-2.568 2.687-7.275l.156-4.396 1.401.7c.779.428 1.83.74 2.298.74.817 0 .895-.195.895-1.712 0-1.595-.078-1.751-1.13-1.984-1.245-.273-2.92-1.907-3.348-3.19-.194-.74-.545-.895-1.79-.895h-1.519v7.119c0 7.82-.078 8.053-2.414 8.637-.818.194-1.285.039-2.025-.74-.584-.544-1.012-1.4-1.012-1.867 0-1.362 1.051-2.645 2.18-2.645.857 0 .935-.156.935-1.751v-1.712l-1.246.234c-4.088.739-6.19 5.057-4.283 8.675 1.48 2.801 5.762 3.89 8.215 2.062z' />
    </svg>
  ),
  [SocialNetwork.VK]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>VK</title>
      <path d='M4.969 27.717c-2.208-.51-3.234-1.258-4.101-2.948C.039 23.275 0 22.685 0 13.957 0 3.302.197 2.398 3.115.865 4.654.039 5.205 0 14 0c10.687 0 11.594.197 13.132 3.106.829 1.533.868 2.084.868 10.85 0 10.655-.197 11.56-3.115 13.093-1.5.786-2.209.865-10.096.943-4.654.04-9.07-.078-9.82-.275zm10.608-9.435c0-1.14.158-1.573.592-1.573.355 0 1.38.708 2.327 1.573 1.42 1.297 1.972 1.572 3.352 1.572 2.09 0 2.09-.55.04-2.87-.868-.983-1.578-1.926-1.578-2.162 0-.197.63-1.415 1.38-2.674 1.814-2.988 1.775-3.302-.355-3.302-1.538 0-1.774.118-2.208 1.18-.75 1.808-2.721 4.403-3.155 4.127-.237-.117-.395-1.376-.395-2.79V8.845H13.37c-1.972 0-2.169.079-1.893.708.513 1.1.67 5.582.197 5.582-.552 0-2.169-2.476-2.997-4.6-.67-1.65-.75-1.69-2.406-1.69-2.09 0-2.169.393-.749 3.46 2.287 4.914 5.206 7.548 8.4 7.548h1.656z' />
    </svg>
  ),
  [SocialNetwork.YOUTUBE]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>YouTube</title>
      <path d='M3.57 23.76C1.912 23.446.807 22.42.373 20.92-.179 18.945-.1 8.762.492 7.105c.276-.75.986-1.737 1.578-2.171 1.066-.79 1.579-.829 11.643-.829 11.761 0 12.353.118 13.577 2.565.592 1.145.71 2.447.71 7.105 0 3.157-.197 6.393-.434 7.222-.75 2.723-1.145 2.842-12.787 2.881-5.644.04-10.696 0-11.209-.118zm11.603-7.695 3.394-2.013-3.591-2.131c-1.973-1.145-3.67-2.092-3.75-2.092-.118 0-.197 1.855-.197 4.144s.158 4.144.355 4.144c.198 0 1.895-.908 3.79-2.052z' />
    </svg>
  ),
  [SocialNetwork.GOOGLE_PLUS]: (
    <svg
      className='social-network-icon'
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      viewBox='0 0 28 28'
      role='img'
    >
      <title>Google+</title>
      <path
        d='M22.167 0H5.833A5.834 5.834 0 0 0 0 5.833v16.334A5.834 5.834 0 0 0 5.833 28h16.334A5.833 5.833 0 0 0 28 22.167V5.833A5.833 5.833 0 0 0 22.167 0zM10.11 19.445A5.44 5.44 0 0 1 4.667 14a5.44 5.44 0 0 1 5.445-5.445c1.47 0 2.698.537 3.648 1.424l-1.479 1.423c-.404-.389-1.113-.84-2.17-.84-1.858 0-3.375 1.54-3.375 3.438 0 1.898 1.517 3.438 3.376 3.438 2.154 0 2.963-1.548 3.088-2.348h-3.088v-1.867h5.14c.048.272.086.545.086.902-.001 3.11-2.085 5.32-5.227 5.32zm13.222-4.667H21v2.333h-1.556v-2.333H17.11v-1.555h2.334V10.89H21v2.333h2.333z'
        style={{
          strokeWidth: 1.16667,
        }}
      />
    </svg>
  ),
} as {
  [key in SocialNetwork]: React.ReactSVGElement;
};

export type Props = {
  socialNetwork: SocialNetwork;
  className?: string;
};

const SocialNetworkIcon: React.FC<Props> = props => {
  const { className = '', socialNetwork } = props;

  const propsToUse = useMemo(
    () => ({
      ...(className.length > 0 && { className }),
    }),
    [className]
  );

  return React.cloneElement(socialNetworkIcons[socialNetwork], propsToUse);
};

export default SocialNetworkIcon;
