import { User } from "@/core/domain/interfaces";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestoreDb } from "@/config/auth";
import { doc, setDoc } from "firebase/firestore";

const createUserService = async ({ email, fullname, role }: User) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    "u1-123"
  );
  const { user } = userCredential;

  return await setDoc(doc(firestoreDb, "users", user.uid), {
    email,
    fullname,
    role,
  });
};

export { createUserService };
