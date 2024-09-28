import React from 'react'

function Navbar() {
  return (
    <>
        <header className="flex items-center justify-between whitespace-nowrap h-[80px] border-b border-solid bg-[#1995AD] border-b-[#F4EFE6] px-10 py-3">
        <div className="flex items-center gap-4 text-[#1C160C]">
          <div className="size-14">
          <img decoding="async" loading="lazy" class=" wp-image-362549" src="https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo-300x300.png" alt="AICTE logo" width="196" height="196" srcset="https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo-300x300.png 300w, https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo-150x150.png 150w, https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo-200x200.png 200w, https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo-100x100.png 100w, https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo-60x60.png 60w, https://www.ndimdelhi.org/wp-content/uploads/2023/10/All_India_Council_for_Technical_Education_logo.png 316w" sizes="(max-width: 196px) 100vw, 196px"/>
          </div>
          <h2 className="text-[#1C160C text-[#03151a] text-lg font-bold leading-tight tracking-[-0.015em]">
            All Indian Council For Technical Education
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9 text-[#03151a]">
            <a
              className=" text-base font-medium leading-normal"
              href="#"
            >
              Home
            </a>
            <a
              className=" text-base font-medium leading-normal"
              href="#"
            >
              About
            </a>
            <a
              className="text-base font-medium leading-normal"
              href="#"
            >
              Scholarships
            </a>
            <a
              className="text-base font-medium leading-normal"
              href="#"
            >
              FAQs
            </a>
            <a
              className="text-base font-medium leading-normal"
              href="#"
            >
              Contact
            </a>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] border-black items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1a697a] text-[#FFFFFF] text-sm font-semibold leading-normal tracking-[0.015em]
                            hover:scale-[90%] transition-all duration-200">
            <span className="truncate">Sign In</span>
          </button>
          
        </div>
      </header>
    </>
  )
}

export default Navbar