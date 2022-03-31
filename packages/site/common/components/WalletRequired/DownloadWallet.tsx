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
      className={`border rounded text-white px-3 py-2`}
      style={{
        borderColor: vendorDetails.color,
        backgroundColor: vendorDetails.color,
      }}
    >
      Download {vendorDetails.name}
    </a>
  );
};

export default DownloadWalletButton;
