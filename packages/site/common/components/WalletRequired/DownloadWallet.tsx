import { FC } from 'react';
import { VendorDetails } from '@common/lib/wallet/types';

type Props = {
  vendorDetails: VendorDetails;
};

const DownloadWalletButton: FC<Props> = ({ vendorDetails }) => {
  return (
    <a
      href={vendorDetails.url}
      target="_blank"
      rel="noreferrer"
      className={`border-[${vendorDetails.color}] rounded text-white bg-[${vendorDetails.color}] px-3 py-2`}
    >
      Download {vendorDetails.name}
    </a>
  );
};

export default DownloadWalletButton;
