
import { MOCK_BLOGGERS } from "../data/MOCK_BLOGGERS";

export const fetchBloggers = async () => {
  // Simulate network delay for a real-world feel
  await new Promise(resolve => setTimeout(resolve, 500)); 
  return MOCK_BLOGGERS; // Your TypeScript object
};

//const { data: bloggers, isLoading } = useQuery({
//the data returned from fetchBloggers will be of stored in const bloggers
  //queryKey: ['bloggers'],
  //queryFn: fetchBloggers,
//});