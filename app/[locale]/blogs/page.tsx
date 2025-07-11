'use client';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useState, useEffect, Suspense } from "react";
import { useLocale, useTranslations } from 'next-intl';
import { Eye } from 'lucide-react'; // Add this import for the views icon
import Loading from "@/app/loading";


interface Blog {
  _id: string;
  title: string;
  description: string;
  Image: {
    secure_url: string;
  };
  createdAt: string;
  customId: string;
Keywords: string[];
views: number;
}

interface BlogResponse {
  message: string;
  blogs: Blog[];
  totalCount: number;
}

 
export default function BlogsPage() {
  const locale = useLocale();
  const t = useTranslations('blog');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = locale === 'ar'
          ? `https://raf-backend.vercel.app/blog/ar?page=${currentPage}&size=${blogsPerPage}`
          : `https://raf-backend.vercel.app/blog/en?page=${currentPage}&size=${blogsPerPage}`;

        const response = await fetch(apiUrl);
        const data: BlogResponse = await response.json();
        console.log(data);
        
        setBlogs(data.blogs);
        setTotalCount(data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, locale]); // Add locale to dependency array


  const totalPages = Math.ceil(totalCount / blogsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('dateLocale'), {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-[#EFEDEA]">
      <header className="bg-[#EFEDEA] top-0 left-0 right-0 shadow-md">
        <Navbar />
      </header>

      <section className="relative mt-[90px] h-[285px] bg-[url('/hero_One.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t('title')}</h1>
        </div>
      </section>

      <Suspense fallback={<Loading />}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">{t('loading')}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="group bg-[#EFEDEA] rounded-2xl overflow-hidden border-2 border-[#540f6b] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="relative">
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={blog.Image.secure_url}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-[#540f6b] text-[#c48765] px-4 py-1 rounded-full text-sm">
                        {t('newLabel')}
                      </div>
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex justify-between items-center text-gray-600 text-sm">
                        <span>{formatDate(blog.createdAt)}</span>
                        <div className="flex items-center gap-1">
                          <Eye size={16} className="text-gray-600" />
                          <span> {blog.views}</span>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold text-[#540f6b] leading-tight ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                        {blog.title}
                      </h3>

                      <p className={`text-gray-600 leading-relaxed line-clamp-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {blog.description}
                      </p>

                      <Link
                        href={`/blogs/${blog._id}`}
                        className="block text-center py-4 border-2 border-[#c48765] text-[#c48765] rounded-xl font-medium hover:bg-[#C48765] hover:text-white transition-all duration-300"
                      >
                        {t('readMore')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Suspense>
      
      <Contact />
      <Footer />
    </main>
  );
}
