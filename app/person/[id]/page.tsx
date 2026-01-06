import MovieCard from '@/components/MovieCard';
import { fetchPersonDetails, getImageUrl, getProfileUrl } from '@/lib/tmdb';
import { MediaItem } from '@/types/tmdb';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PersonPageProps {
  params: Promise<{ id: string }>;
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const personId = parseInt(id);

  if (isNaN(personId)) {
    notFound();
  }

  let person;
  try {
    person = await fetchPersonDetails(personId);
  } catch {
    notFound();
  }

  // Calculate age
  const calculateAge = (birthday: string | null, deathday: string | null = null) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    let age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = endDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(person.birthday, person.deathday);
  
  // Get credits - combine and dedupe
  const allCredits = person.combined_credits;
  const castCredits = allCredits?.cast || [];
  const crewCredits = allCredits?.crew || [];

  // Sort by popularity/recent
  const sortedCastCredits = [...castCredits]
    .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    .slice(0, 30);

  // Get profile images
  const profileImages = person.images?.profiles || [];

  // Format known for department
  const knownFor = person.known_for_department;

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Left Column: Photo & Personal Info */}
          <div className="w-full md:w-80 flex-shrink-0 space-y-8">
            {/* Profile Photo */}
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
              {person.profile_path ? (
                <Image
                  src={getProfileUrl(person.profile_path, 'h632')}
                  alt={person.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 text-gray-400">
              {person.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${person.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors transform hover:scale-110"
                  title="IMDb"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.06-.104.089-.32.089-.646V10.5c0-.298-.02-.494-.06-.583-.043-.087-.12-.146-.233-.174l.124-.155zm-4.63-.056h-.637v4.902h.637c.2 0 .348-.06.45-.186.102-.122.152-.328.152-.612V10.33c0-.284-.05-.488-.152-.612-.102-.122-.25-.186-.45-.186zM14.86 0H9.14C6.516 0 4 2.516 4 5.14v9.72C4 17.484 6.516 20 9.14 20h5.72c2.624 0 5.14-2.516 5.14-5.14V5.14C20 2.516 17.484 0 14.86 0zm-6.67 9.555c0-.39.093-.69.28-.903.184-.21.436-.317.756-.317.316 0 .568.108.755.322.187.21.282.512.282.905v4.4c0 .39-.093.685-.28.888-.185.2-.437.3-.757.3-.32 0-.572-.1-.756-.3-.187-.2-.28-.498-.28-.89v-4.4-.005zm-2.69-.438h1.17v5.698H7.5v-5.7-.003.004zm5.15 5.698c-.152.037-.298.054-.437.054-.17 0-.316-.017-.44-.054h-.003c-.12-.037-.206-.082-.256-.138-.05-.056-.082-.123-.095-.2-.015-.076-.02-.18-.02-.308v-5.05c0-.193.08-.328.24-.4.164-.075.4-.112.716-.112h.295v6.208zm4.16-1.36c0 .332-.028.587-.086.77-.056.182-.16.33-.303.438-.137.104-.33.173-.58.204-.232.03-.536.05-.912.05v-5.91c.374 0 .68.016.912.048.252.03.445.1.58.2.14.1.245.244.304.433.058.19.087.447.087.77v3.002l-.002-.005z"/>
                  </svg>
                </a>
              )}
              {person.homepage && (
                <a
                  href={person.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors transform hover:scale-110"
                  title="Website"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
            </div>

            {/* Personal Info Box */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Personal Info</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {knownFor && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Known For</span>
                    <span className="text-white font-medium">{knownFor}</span>
                  </div>
                )}
                
                {person.birthday && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Born</span>
                    <span className="text-white font-medium">
                      {new Date(person.birthday).toLocaleDateString('en-US', { 
                        month: 'long', day: 'numeric', year: 'numeric' 
                      })}
                      {age && !person.deathday && (
                        <span className="text-gray-400 text-sm ml-1">({age} years old)</span>
                      )}
                    </span>
                  </div>
                )}

                {person.deathday && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Died</span>
                    <span className="text-white font-medium">
                      {new Date(person.deathday).toLocaleDateString('en-US', { 
                        month: 'long', day: 'numeric', year: 'numeric' 
                      })}
                      {age && (
                        <span className="text-gray-400 text-sm ml-1">(aged {age})</span>
                      )}
                    </span>
                  </div>
                )}

                {person.place_of_birth && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Place of Birth</span>
                    <span className="text-white font-medium">{person.place_of_birth}</span>
                  </div>
                )}

                {person.gender > 0 && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Gender</span>
                    <span className="text-white font-medium">
                      {person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Non-binary'}
                    </span>
                  </div>
                )}

                <div>
                  <span className="block text-sm text-gray-500 mb-1">Total Credits</span>
                  <span className="text-white font-medium">{castCredits.length + crewCredits.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Credits */}
          <div className="flex-1 space-y-12">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {person.name}
              </h1>
              
              {person.biography ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Biography</h3>
                  <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
                    {person.biography.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No biography available.</p>
              )}
            </div>

            {/* Known For (Acting) */}
            {sortedCastCredits.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-1 h-6 bg-primary mr-3 rounded-full"></span>
                  Known For {knownFor === 'Acting' && '(Acting)'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {sortedCastCredits.slice(0, 10).map((credit) => (
                    <MovieCard
                      key={`${credit.id}-${credit.character}`}
                      item={{
                        id: credit.id,
                        title: credit.title || credit.name || '',
                        poster_path: credit.poster_path,
                        backdrop_path: credit.backdrop_path || null,
                        vote_average: credit.vote_average,
                        media_type: credit.media_type,
                        genre_ids: [],
                      } as unknown as MediaItem}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Profile Images */}
            {profileImages.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-1 h-6 bg-primary mr-3 rounded-full"></span>
                  Photos
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {profileImages.slice(0, 10).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={getImageUrl(image.file_path, 'w342')}
                        alt={`${person.name} photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
