import React from 'react'

const ChapterContent = ({ courseContentData, activeIndex }: any) => {
    if (!courseContentData || !courseContentData[activeIndex]) {
        return <div className="p-8 text-center text-gray-500">Select a chapter to see its content.</div>;
    }

    const chapter = courseContentData[activeIndex];
    const mainContent = chapter.content;

    if (!mainContent) {
        return <div className="p-8 text-center text-gray-500">No content available for this chapter.</div>;
    }

    return (
        <div className="p-6 md:p-10 space-y-6">
            {/* YouTube Video Player */}
            {chapter.videoId && (
                <div className="w-full max-w-4xl mx-auto">
                    <div className="aspect-video w-full">
                        <iframe
                            className="w-full h-full rounded-lg shadow-lg border"
                            src={`https://www.youtube.com/embed/${chapter.videoId}?rel=0`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Chapter Text Content */}
            <h2 className="text-3xl font-bold text-gray-800">{mainContent?.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{mainContent?.description}</p>

            {mainContent?.details && Array.isArray(mainContent.details) && (
                <div className="space-y-6">
                    {mainContent.details.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-xl mb-3 text-violet-700">{item.title}</h3>
                            <p className="text-gray-700 mb-4">{item.description}</p>
                            {item.codeExample && (
                                <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                                    <code>{item.codeExample.replace(/\\n/g, '\n')}</code>
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ChapterContent