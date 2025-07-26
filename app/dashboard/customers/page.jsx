// app/dashboard/consumer/[id]/page.jsx
'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConsumerProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");

  // Dummy data (replace with real API call or props)
  const consumer = {
    id: '1',
    name: 'Test',
    mobile: '1234567899',
    email: 'testnew@gmail.com',
    dob: '31-12-2003',
    fatherName: 'Test',
    aadhaar: '123456789123',
    profileId: 'TestConsumer01',
    education: 'Graduate',
    qualification: 'B.A',
    pancard: 'ABCDE1234F',
    joiningDate: '01-Jan-2024',
    address: {
      local: {
        address: 'Test Address',
        country: 'India',
        state: 'Rajasthan',
        city: 'Jaipur',
        pincode: '302001',
        landmark: 'Near Test',
      },
      permanent: {
        address: 'Test Address',
        country: 'India',
        state: 'Rajasthan',
        city: 'Jaipur',
        pincode: '302001',
        landmark: 'Near Test',
      },
    },
    documents: {
      aadhaarFront: '/aadhaar-front.png',
      aadhaarBack: '/aadhaar-back.png',
      pancard: '/pancard.png',
      tenth: '/tenth.png',
      twelfth: '/twelfth.png',
      graduate: '/graduate.png',
      postgraduate: '/pg.png',
      other: '/notfound.png',
      caste: '/notfound.png',
    },
    bank: {
      name: 'SBI',
      accountNo: '123456789012',
      ifsc: 'SBIN0001234',
      branch: 'SBI Jaipur',
      holder: 'Test',
    },
    coupons: [
      {
        id: '1',
        name: 'Test Coupon',
        code: 'TEST100',
        validFrom: '01-Dec-2023',
        validTo: '25-Dec-2023',
        percentage: '100%',
        value: '₹2,375',
        image: '/coupon.png',
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label>Consumer Name</label>
          <input className="input" value={consumer.name} readOnly />

          <label>Mobile No</label>
          <input className="input" value={consumer.mobile} readOnly />

          <label>Email</label>
          <input className="input" value={consumer.email} readOnly />

          <label>Date of Birth</label>
          <input className="input" value={consumer.dob} readOnly />
        </div>

        <div className="space-y-2">
          <label>Father's Name</label>
          <input className="input" value={consumer.fatherName} readOnly />

          <label>Aadhaar No</label>
          <input className="input" value={consumer.aadhaar} readOnly />

          <label>PAN No</label>
          <input className="input" value={consumer.pancard} readOnly />

          <label>Profile ID</label>
          <input className="input" value={consumer.profileId} readOnly />
        </div>

        <div className="space-y-2">
          <label>Education</label>
          <input className="input" value={consumer.education} readOnly />

          <label>Qualification</label>
          <input className="input" value={consumer.qualification} readOnly />

          <label>Joining Date</label>
          <input className="input" value={consumer.joiningDate} readOnly />
        </div>
      </section>

      {/* Address Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold">Local Address</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(consumer.address.local).map(([key, value]) => (
              <input key={key} className="input" value={value} readOnly />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Permanent Address</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(consumer.address.permanent).map(([key, value]) => (
              <input key={key} className="input" value={value} readOnly />
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(consumer.documents).map(([key, src]) => (
            <div key={key}>
              <p className="text-sm capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
              <Image
                src={src}
                alt={key}
                width={300}
                height={200}
                className="border rounded shadow"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Bank Details */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(consumer.bank).map(([key, value]) => (
            <input key={key} className="input" value={value} readOnly />
          ))}
        </div>
      </section>

      {/* Coupons */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Coupons</h3>
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>#</th>
                <th>Coupon Name</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Code</th>
                <th>Percentage</th>
                <th>Value</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {consumer.coupons.map((coupon, index) => (
                <tr key={coupon.id} className="border-t">
                  <td>{index + 1}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.validFrom}</td>
                  <td>{coupon.validTo}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.percentage}</td>
                  <td>{coupon.value}</td>
                  <td>
                    <Image
                      src={coupon.image}
                      alt="Coupon"
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
