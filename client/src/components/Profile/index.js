import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import ChangeInfo from "./changeInfo";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState(null);
  console.log(user);
  const changehandler = (e) => {
    setImageState(URL.createObjectURL(e.target.files[0]));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await axios.patch("http://localhost:5000/api/v1/auth/updateUser", formData, {
        withCredentials: true,
      });
      dispatch(userActions.setUser(result.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-2xl min-h-screen px-4 mx-auto py-28 sm:px-6 md:max-w-7xl lg:px-8">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-10 md:gap-6">
          <div className="md:col-span-4">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
            {/* Change Info Component */}
            <ChangeInfo />
          </div>
          <div className="mt-5 md:col-span-6 md:mt-0">
            <form onSubmit={submitHandler}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 py-5 bg-white sm:py-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                        <div className="flex items-center mt-1">
                          <img src={imageState || user?.avatar} alt="" className="inline-block object-cover w-12 h-12 overflow-hidden bg-gray-100 rounded-full" />
                          {/* Change */}
                          <input type="file" name="avatar" onChange={changehandler} className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2" />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Your name
                      </label>
                      <input type="text" name="name" id="first-name" defaultValue={user?.name} autoComplete="given-name" className="block w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-black/50 focus:ring-black/50 sm:text-sm" />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input disabled type="text" name="email-address" id="email-address" value={user ? user.email : ""} autoComplete="email" className="block w-full mt-1 text-gray-400 border-gray-200 rounded-md shadow-sm focus:border-black/50 focus:ring-black/50 sm:text-sm" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select id="country" name="country" autoComplete="country-name" className="block w-full px-3 py-2 mt-1 bg-white border border-gray-500 rounded-md shadow-sm focus:border-black/50 focus:outline-none focus:ring-black/50 sm:text-sm">
                        <option>Egypt</option>
                        <option>Saudi Arabia</option>
                        <option>United Arab Emirates</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input type="text" name="street" id="street-address" autoComplete="street-address" defaultValue={user?.address?.street} className="block w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-black/50 focus:ring-black/50 sm:text-sm" />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input type="text" name="city" id="city" autoComplete="address-level2" defaultValue={user?.address?.city} className="block w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-black/50 focus:ring-black/50 sm:text-sm" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input type="text" name="state" id="region" autoComplete="address-level1" defaultValue={user?.address?.state} className="block w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-black/50 focus:ring-black/50 sm:text-sm" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="phone-num" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input type="text" name="phone" id="phone-num" autoComplete="phone" defaultValue={user?.address?.phone} className="block w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-black/50 focus:ring-black/50 sm:text-sm" />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
