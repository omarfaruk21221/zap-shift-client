import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import RoundLoader from "../../../Components/Spinner/RoundLoader";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserTag,
  FaEdit,
  FaCheckCircle,
  FaBriefcase,
  FaStar,
  FaShieldVirus,
  FaCog,
  FaBell,
} from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  console.log(users);
  if (isLoading) {
    return <RoundLoader />;
  }

  return (
    <>
      {users?.map((profile) => (
        <div key={profile._id} className="min-h-screen py-12 px-4 md:px-12 bg-base-200/30">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* 1. Main Profile Header Card */}
            <div className="bg-base-100 rounded-[3rem] shadow-2xl shadow-secondary/10 overflow-hidden border border-base-300 relative group/card">
              {/* Dynamic Banner */}
              <div className="h-56 md:h-72 bg-secondary relative overflow-hidden transition-all duration-700">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>

                {/* Abstract Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(202,235,102,0.4) 1px, transparent 0)`,
                      backgroundSize: "40px 40px",
                    }}
                  ></div>
                </div>

                {/* Top Controls */}
                <div className="absolute top-8 right-8 flex gap-3">
                  <button className="btn btn-circle btn-secondary btn-sm md:btn-md shadow-lg shadow-primary/20 hover:rotate-90 transition-all duration-500">
                    <FaCog />
                  </button>
                  <button className="btn btn-circle btn-primary btn-sm md:btn-md shadow-lg shadow-primary/20">
                    <FaBell />
                  </button>
                </div>
              </div>

              {/* Profile Identity Section */}
              <div className="relative px-8 md:px-16 pb-12">
                {/* Huge Avatar with Ring */}
                <div className="absolute -top-24 md:-top-32 left-8 md:left-16 flex items-end gap-8">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-primary/50 to-secondary rounded-full blur-md opacity-20 group-hover/card:opacity-40 transition duration-1000"></div>
                    <div className="relative p-1.5 bg-base-100 rounded-full">
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.ibb.co/2kRZ6rM/avatar.png"
                        }
                        alt="Avatar"
                        className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-2xl border-2 border-base-300"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary text-secondary p-3 rounded-full border-4 border-base-100 shadow-2xl animate-bounce-slow">
                      <FaCheckCircle size={22} />
                    </div>
                  </div>
                </div>

                {/* Identity & Main Actions */}
                <div className="pt-24 md:pt-6 md:ml-64 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <h1 className="text-2xl md:text-4xl font-black text-secondary tracking-tight">
                        {profile?.displayName || user?.displayName}
                      </h1>
                      <span className="badge badge-primary text-secondary font-bold px-4 py-3 rounded-lg text-xs uppercase tracking-widest shadow-md">
                        LVL 12 Member
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2 text-secondary/70 font-semibold bg-secondary/5 px-4 py-2 rounded-2xl">
                        <FaEnvelope className="text-secondary" />
                        {profile?.email || "mail@gmail.com"}
                      </div>
                      <div className="flex items-center gap-2 text-secondary/70 font-semibold bg-secondary/5 px-4 py-2 rounded-2xl capitalize">
                        <FaUserTag className="text-secondary" size={14} />
                        Role: {profile?.role || "Free User"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="btn btn-secondary rounded-[1.5rem] px-10 h-14 font-bold shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
                      <FaEdit className="mr-2" /> Update Profile
                    </button>
                  </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 p-2 rounded-[2.5rem] bg-secondary/5 border border-secondary/5">
                  <StatBox
                    icon={<FaStar />}
                    label="Platform Rating"
                    value="4.9/5.0"
                  />
                  <StatBox
                    icon={<FaBriefcase />}
                    label="Total Activity"
                    value="128 Points"
                  />
                  <StatBox
                    icon={<FaShieldVirus />}
                    label="Account Health"
                    value="100% Secure"
                  />
                  <StatBox
                    icon={<FaCalendarAlt />}
                    label="Years Joined"
                    value="1.2 Years"
                  />
                </div>
              </div>
            </div>

            {/* 2. Secondary Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Detailed Info Column */}
              <div className="md:col-span-2 space-y-8">
                <section className="bg-base-100 p-10 rounded-[2.5rem] shadow-xl border border-base-200">
                  <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center gap-3">
                    <span className="p-2 bg-primary/10 rounded-xl">
                      <FaUser className="text-primary" />
                    </span>
                    Personal Biography
                  </h3>
                  <div className="space-y-6">
                    <p className="text-secondary/70 leading-relaxed text-xl italic font-medium">
                      "Welcome to your professional headquarters on Zap-Shift.
                      This dashboard provides a 360-degree view of your account
                      status, integration progress, and security standing. We
                      are committed to providing you with the best tools to
                      manage your shifts and projects effectively."
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-base-200">
                      <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <FaCalendarAlt className="text-secondary/50 group-hover:text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-secondary/40 uppercase tracking-wider">
                            Account Creation
                          </p>
                          <p className="font-bold text-secondary">
                            {new Date(
                              profile?.createdAt || Date.now()
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <FaShieldAlt className="text-secondary/50 group-hover:text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-secondary/40 uppercase tracking-wider">
                            Verification Level
                          </p>
                          <p className="font-bold text-secondary">
                            Tier 2 Verified
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Account Security Widget */}
              <div className="space-y-8">
                <div className="bg-secondary p-8 rounded-[2.5rem] text-base-100 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <FaShieldAlt className="text-primary" /> Security Status
                  </h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                      <span className="text-sm font-medium">
                        Password Status
                      </span>
                      <span className="badge badge-success badge-sm">
                        Excellent
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl">
                      <span className="text-sm font-medium">2FA Enabled</span>
                      <div className="toggle toggle-primary toggle-sm"></div>
                    </div>
                    <div className="pt-4">
                      <button className="btn btn-primary btn-block rounded-2xl font-bold">
                        Manage Security
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary p-8 rounded-[2.5rem] text-secondary shadow-xl">
                  <h4 className="text-xl font-bold mb-4">Membership Goal</h4>
                  <div className="w-full bg-secondary/10 h-3 rounded-full overflow-hidden mb-2">
                    <div className="bg-secondary h-full w-[70%]"></div>
                  </div>
                  <p className="text-sm font-bold opacity-70">
                    70% to Premium Pro
                  </p>
                  <button className="btn btn-secondary btn-outline btn-sm rounded-full mt-4 w-full">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Helper Components
const StatBox = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center hover:bg-base-100 rounded-[2rem] transition-all duration-300">
    <div className="text-primary text-2xl mb-2">{icon}</div>
    <p className="text-[10px] font-black uppercase text-secondary/40 tracking-[0.2em]">
      {label}
    </p>
    <p className="text-xl font-black text-secondary">{value}</p>
  </div>
);

export default MyProfile;
