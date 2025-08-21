import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Droplets, Package, FileText, Zap, Shield, LogOut, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Index = () => {
  const { user, signOut } = useAuth();
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState({ pulverizacao: 0, voo: 0, solido: 0 });

  useEffect(() => {
    if (user) {
      fetchRecentReports();
    }
  }, [user]);

  const fetchRecentReports = async () => {
    try {
      setLoading(true);

      // Buscar últimos 3 relatórios de cada tipo
      const [pulvData, vooData, solidoData] = await Promise.all([
        supabase
          .from("relatorio_pulverizacao")
          .select("id, data_voo, cultura, produto, area_hectares, created_at")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("relatorio_voo_agricola")
          .select("id, data_voo, cultura, tipo_operacao, area_hectares, created_at")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("relatorio_solido")
          .select("id, data_aplicacao, cultura, produto, area_hectares, created_at")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false })
          .limit(3)
      ]);

      // Contar total de relatórios
      const [pulvCount, vooCount, solidoCount] = await Promise.all([
        supabase
          .from("relatorio_pulverizacao")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user?.id),
        supabase
          .from("relatorio_voo_agricola")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user?.id),
        supabase
          .from("relatorio_solido")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user?.id)
      ]);

      // Combinar e organizar por data mais recente
      const allReports = [
        ...(pulvData.data || []).map(report => ({ ...report, type: "pulverizacao", icon: Droplets })),
        ...(vooData.data || []).map(report => ({ ...report, type: "voo", icon: Plane })),
        ...(solidoData.data || []).map(report => ({ ...report, type: "solido", icon: Package }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setRecentReports(allReports.slice(0, 6));
      setTotalReports({
        pulverizacao: pulvCount.count || 0,
        voo: vooCount.count || 0,
        solido: solidoCount.count || 0
      });
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  };

  const getReportTitle = (report: any) => {
    switch (report.type) {
      case "pulverizacao":
        return `Pulverização - ${report.cultura}`;
      case "voo":
        return `Voo Agrícola - ${report.cultura}`;
      case "solido":
        return `Aplicação Sólido - ${report.cultura}`;
      default:
        return report.cultura;
    }
  };

  const getReportSubtitle = (report: any) => {
    switch (report.type) {
      case "pulverizacao":
        return `Produto: ${report.produto} • Área: ${report.area_hectares} ha`;
      case "voo":
        return `Operação: ${report.tipo_operacao} • Área: ${report.area_hectares} ha`;
      case "solido":
        return `Produto: ${report.produto} • Área: ${report.area_hectares} ha`;
      default:
        return `Área: ${report.area_hectares} ha`;
    }
  };

  const getReportDate = (report: any) => {
    const dateField = report.type === "solido" ? "data_aplicacao" : "data_voo";
    return formatDate(report[dateField]);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-agriculture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Wincenter Agriculture</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-primary-foreground/90 text-sm">
                {user?.email}
              </span>
              <Badge variant="secondary" className="bg-agriculture-secondary text-agriculture-earth">
                HD540s Drone System
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-primary-foreground mb-6">
            Sistema de Relatórios de Voo Agrícola
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Gerencie seus relatórios de pulverização, voos agrícolas e aplicação de sólidos 
            com precisão e facilidade usando nosso drone HD540s
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button asChild variant="secondary" size="lg" className="bg-agriculture-secondary hover:bg-agriculture-secondary/90">
              <Link to="/pulverizacao">
                <Droplets className="mr-2 h-5 w-5" />
                Relatório de Pulverização
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-agriculture-secondary hover:bg-agriculture-secondary/90">
              <Link to="/voo-agricola">
                <Plane className="mr-2 h-5 w-5" />
                Relatório de Voo Agrícola
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-agriculture-secondary hover:bg-agriculture-secondary/90">
              <Link to="/solido">
                <Package className="mr-2 h-5 w-5" />
                Relatório de Sólido
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/relatorios">
                <BarChart className="mr-2 h-5 w-5" />
                Ver Todos os Relatórios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-agriculture-light">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Por que escolher nosso sistema?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card-custom border-border/50">
              <CardHeader>
                <Zap className="h-10 w-10 text-agriculture-primary mb-2" />
                <CardTitle>Rapidez e Precisão</CardTitle>
                <CardDescription>
                  Cadastre relatórios em segundos com nosso sistema otimizado
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card-custom border-border/50">
              <CardHeader>
                <Shield className="h-10 w-10 text-agriculture-primary mb-2" />
                <CardTitle>Segurança de Dados</CardTitle>
                <CardDescription>
                  Seus relatórios ficam seguros em nossa plataforma confiável
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card-custom border-border/50">
              <CardHeader>
                <FileText className="h-10 w-10 text-agriculture-primary mb-2" />
                <CardTitle>Relatórios Completos</CardTitle>
                <CardDescription>
                  Documentação detalhada para controle total das operações
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-card-custom bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">{totalReports.pulverizacao}</CardTitle>
                    <CardDescription className="text-primary-foreground/90">
                      Relatórios de Pulverização
                    </CardDescription>
                  </div>
                  <Droplets className="h-12 w-12 text-primary-foreground/80" />
                </div>
              </CardHeader>
            </Card>

            <Card className="shadow-card-custom bg-gradient-secondary text-secondary-foreground">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">{totalReports.voo}</CardTitle>
                    <CardDescription className="text-secondary-foreground/90">
                      Relatórios de Voo Agrícola
                    </CardDescription>
                  </div>
                  <Plane className="h-12 w-12 text-secondary-foreground/80" />
                </div>
              </CardHeader>
            </Card>

            <Card className="shadow-card-custom border-agriculture-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-agriculture-primary">{totalReports.solido}</CardTitle>
                    <CardDescription>
                      Relatórios de Sólidos
                    </CardDescription>
                  </div>
                  <Package className="h-12 w-12 text-agriculture-primary/80" />
                </div>
              </CardHeader>
            </Card>
          </div>

          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Últimos Relatórios
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando relatórios...</p>
            </div>
          ) : recentReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-4">Nenhum relatório encontrado</p>
              <p className="text-muted-foreground mb-6">
                Comece criando seu primeiro relatório usando um dos botões acima
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.map((report, index) => {
                const IconComponent = report.icon;
                return (
                  <Card key={`${report.type}-${report.id}-${index}`} className="shadow-card-custom">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-agriculture-primary" />
                          {getReportTitle(report)}
                        </CardTitle>
                        <Badge variant="outline" className="text-agriculture-primary border-agriculture-primary">
                          Concluído
                        </Badge>
                      </div>
                      <CardDescription>
                        {getReportSubtitle(report)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Data: {getReportDate(report)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {recentReports.length > 0 && (
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/relatorios">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver todos os relatórios
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-agriculture-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-semibold">Wincenter Agriculture</span>
          </div>
          <p className="text-primary-foreground/80">
            Tecnologia de precisão para agricultura moderna com drone HD540s
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;