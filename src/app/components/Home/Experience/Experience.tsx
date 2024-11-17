"use client"
import './Experience.css'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import FilterTabs from './Filter/Tabs/FilterTabs';
import Timeline from './Timeline/Timeline';
import FilterDropdown from './Filter/Dropdown/FilterDropdown';

export type options = "design" | "development" | "others" | "education" | string;

export default function Experience() {

    const router = useRouter()
    const [showing, setShowing] = useState<options[]>(["development", "design"])
    const [maxItems, setMaxItems] = useState<number>(5)

    // Render experience based on URL params (/?experience=string)
    const searchParams = useSearchParams()
    const experienceParams = searchParams.get("experience")
    useEffect(() => {

        if (!experienceParams || experienceParams.length < 1) return;
        
        const URLshowing: string[] = experienceParams.replaceAll("\\", "-").split(" ")
        
        console.log(URLshowing)
        setShowing(URLshowing);        

    }, [])

    // Copy sharable URL
    function copyURL() {
        if (showing.length === 0) { router.push("/#experience"); return; }
        else if (showing.length > 0) { 
            const params = `experience=${showing.map(s => s,"+")}`.replaceAll(",", "+");
            router.push(`/?${params}#experience`); 
            return;
        }
    }

    return (<section id="experience" className='section-padding-y'>


        <div className="top">
            <div className="main">
                <h2 className="copy-url" onClick={copyURL}>Experience</h2>
        
                <FilterDropdown showing={showing} setShowing={setShowing} maxItems={maxItems} setMaxItems={setMaxItems} />
            </div>

            <div className='filter-tabs-wrapper'>
                <FilterTabs showing={showing} setShowing={setShowing}/>
            </div>

            <div className="stats center">
                
            </div>
        </div>

        <Timeline setShowing={setShowing} showing={showing} maxItems={maxItems} setMaxItems={setMaxItems} />

    </section>)
}