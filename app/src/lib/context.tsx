import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Review } from "./types";

interface Apptype {
  movieName: string;
  setMovieName: Dispatch<SetStateAction<string>>;
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[]>>;
  summary: string;
  setSummary: Dispatch<SetStateAction<string>>;
}
// Create the context
const AppContext = createContext<Apptype>({} as Apptype);

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // State to hold user authentication status
  const [movieName, setMovieName] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <AppContext.Provider
      value={{
        movieName,
        setMovieName,
        reviews,
        setReviews,
        summary,
        setSummary,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useApp = () => {
  return useContext(AppContext);
};
